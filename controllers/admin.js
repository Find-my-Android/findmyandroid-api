const connection = require("../connection");

/*
  Route: /admin/user/all
  Selects all users
*/
exports.allUsers = async (req, res) => {
  const query =
    "SELECT user_id, email, first_name, last_name, primary_num, secondary_num, account_type, last_used FROM user";

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
exports.editUser = async (req, res) => {
  const query =
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, primary_num = ?, secondary_num = ?, account_type = ? WHERE user_id = ?";
  const params = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.primary_num,
    req.body.secondary_num,
    req.body.account_type,
    req.body.user_id,
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
  const query = "SELECT * FROM phone";

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
