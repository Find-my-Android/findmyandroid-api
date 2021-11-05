const jwt = require("jsonwebtoken");
const fs = require("fs");
const connection = require("../connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretJwt = JSON.parse(fs.readFileSync("jwt.json", "utf8")).jwt;

/*
  Route: /user/signup
  Create a user in the database
*/
exports.create = async (req, res) => {
  // Check to see if the user exists
  let userExists = await checkIfUserExists(req.body.email);

  if (!userExists) {
    //No user exists, so generate insert query
    const query =
      "INSERT INTO user(first_name, last_name, email, primary_num, secondary_num, account_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

    //Hash the password
    let password = await bcrypt.hash(req.body.password, saltRounds);

    //Params for prepared SQL
    const params = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.primary_num,
      req.body.secondary_num,
      req.body.account_type,
      password,
    ];

    //Connect to the database and run the query
    connection.query(query, params, (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send({
        ok: true,
        id: result.insertId,
      });
    });
  } else {
    //A user exists so return an error
    res.status(400).send("User Exists");
  }
};

/*
  Route: /user/login
  Log a user in. On verification, it will send a a jwt to the client
*/
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // No password or email provided
  if (!email || !password) {
    return res.status(401).send("No email or password provided");
  }

  //Get the password stored in the database
  let passwordInDB = await getPassword(email, password);

  //Email doesn't exist in the database
  if (!passwordInDB) {
    return res.status(401).send("No account with that email exists");
  }

  //Check to see if the password is correct
  let correctPassword = await bcrypt.compare(password, passwordInDB);

  //Password is incorrect
  if (!correctPassword) {
    return res.status(401).send("Incorrect password");
  }

  //Get the user_id
  const query = "SELECT user_id FROM user WHERE email = ?";
  const params = [email];

  let user_id = await new Promise((resolve, reject) => {
    //Query the database with the query
    connection.query(query, params, (error, results) => {
      if (results.length == 0) {
        return reject();
      } else {
        return resolve(results[0].user_id);
      }
    });
  });

  if (!user_id) {
    return res.status(401).send("Couldn't get user_id");
  }

  //generate jwt
  let jwt = generateJWT({ user_id: user_id, email: email });

  //send the jwt
  res.json({ ok: true, jwt: jwt });
};

/*
  Route: /user
  Get user
*/
exports.get = async (req, res) => {
  const query =
    "SELECT user_id, email, first_name, last_name, primary_num, secondary_num, account_type from user WHERE user_id = ?";
  const params = [req.user.user_id];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
      user: results,
    });
  });
};

exports.edit = async (req, res) => {
  const query =
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, primary_num = ?, secondary_num = ?, password = ? WHERE user_id = ?";

  let password = await bcrypt.hash(req.body.password, saltRounds);

  const params = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.primary_num,
    req.body.secondary_num,
    req.user.user_id,
    password,
  ];

  //Updates User on user_id, with changing of password.
  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
    });
  });
};

/**
 * Util function to check if the user exists
 * @param {} email the email submitted in the body of the request
 * @returns A promise resolving to false if the user does not exist
 * and true if the user does exist
 */
function checkIfUserExists(email) {
  //Generate query with prepared statement
  const query = "SELECT * FROM user WHERE email = ?";
  const params = [email];

  return new Promise((resolve, reject) => {
    //Query the database with the query
    connection.query(query, params, (error, results) => {
      if (error) {
        return reject(error);
      }

      if (results.length == 0) {
        //No user exists with the email
        return resolve(false);
      } else {
        //A user exists with the email
        return resolve(true);
      }
    });
  });
}

function getPassword(email, password) {
  const query = "SELECT password FROM user WHERE email = ?";
  const params = [email];

  return new Promise((resolve, reject) => {
    //Query the database with the query
    connection.query(query, params, (error, results) => {
      if (results.length == 0) {
        //No user exists with the email
        return resolve(false);
      } else {
        //A user exists with the email
        return resolve(results[0].password);
      }
    });
  });
}

function generateJWT(user) {
  return jwt.sign(user, secretJwt, { expiresIn: "3600s" });
}
