const connection = require("../connection");

/*
  Route: /phone/:user_id/all
  Selects all phones from a user.
*/
exports.allPhones = async (req, res) => {
  const query = "SELECT * FROM phone WHERE user_id = ?";
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
  const query = "DELETE phone WHERE imei = ?";
  const params = [req.body.imei];

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
    "UPDATE phone SET latitude = ?, longitude = ?, tracking_state = ?, last_tracked = ?, stolen_state = ? WHERE imei = ?";
  const params = [
    req.body.latitude,
    req.body.longitude,
    req.body.tracking_state,
    req.body.last_tracked,
    req.body.stolen_state,
    req.body.imei,
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
