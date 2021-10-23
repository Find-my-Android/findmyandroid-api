const connection = require("../connection");

/*
  Route: /admin/user/all
  Selects all users
*/
exports.allUsers = async (req, res) => {
  const query = "SELECT * FROM Users";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send({
        ok: true,
        users: results,
      });
    });
  });
};

/*
  Route: /admin/user/edit
  Edits all user information
*/
exports.edit = async (req, res) => {
  const query =
    "UPDATE User SET first_name = ?, last_name = ?, email = ?, primary = ?, secondary = ?, type = ? WHERE user_id = ?";
  const params = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.primary,
    req.body.secondary,
    req.body.type,
    req.user.user_id,
  ];

  //Updates User on user_id, withheld changing of password.
  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
    });
  });
};

/*
  Route: /admin/phone/all
  Selects all phones
*/
exports.allPhones = async (req, res) => {
  const query = "SELECT * FROM Phones";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send({
        ok: true,
        phones: results,
      });
    });
  });
};
