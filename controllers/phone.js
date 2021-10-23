const connection = require("../connection");

/*
  Route: /phone/:user_id/all
  Selects all phones from a user.
*/
exports.allPhones = async (req, res) => {
  const query = "SELECT * FROM Phones WHERE user_id = ?";
  const params = [req.params.user_id];

  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
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

/*
  Route: /phone/delete
  Deletes a phone
*/
exports.delete = async (req, res) => {
  const query = "DELETE Phone WHERE Phone.phone_id = ?";
  const params = [req.body.phone_id];

  // Delete MonthlyBudgetCategory linking records
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
  Route: /phone/edit
  Updates the phone with the given information.
*/
exports.edit = async (req, res) => {
  const query =
    "UPDATE Phone SET lat = ?, lng = ?, tracking = ?, status = ? WHERE phone_id = ?";
  const params = [
    req.body.lat,
    req.body.lng,
    req.body.tracking,
    req.body.status,
    req.body.phone_id,
  ];
  connection.query(query, params, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
    });
  });
};
