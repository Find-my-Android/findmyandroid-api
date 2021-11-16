const connection = require("../connection");

/*
  Route: /phone/all
  Selects all phones for the logged in user.
*/
exports.allPhones = async (req, res) => {
  const query = "SELECT * FROM phone WHERE user_id = ?";
  const params = [req.user.user_id];

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
  Route: /phone/get
  Selects a phone for the logged in user with an IMEI.
*/
exports.getPhone = async (req, res) => {
  const query = "SELECT * FROM phone WHERE imei = ? and user_id = ?";
  const params = [req.body.imei, req.user.user_id];

  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send({
        ok: true,
        phone: results,
      });
    });
  });
};

/*
  Route: /phone/delete
  Deletes a phone for the logged in user
*/
exports.delete = async (req, res) => {
  const query = "DELETE phone WHERE imei = ? AND user_id = ?";
  const params = [req.body.imei, req.user.user_id];

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
  Edits phone information for the logged in user
*/
exports.editPhone = async (req, res) => {
  const query =
    "UPDATE phone SET name = ?, phone_num = ?, tracking_state = ?, stolen_state = ? WHERE imei = ? and user_id = ?";
  const params = [
    req.body.name,
    req.body.phone_num,
    req.body.tracking_state,
    req.body.stolen_state,
    req.body.imei,
    req.user.user_id,
  ];

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
  Route: /phone/track
  Edits phone tracking information for the logged in user
*/
exports.trackPhone = async (req, res) => {
  const query =
    "UPDATE phone SET latitude = ?, longitude = ?, last_tracked = NOW(), WHERE imei = ? and user_id = ?";
  const params = [
    req.body.latitude,
    req.body.longitude,
    req.body.imei,
    req.user.user_id,
  ];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
    });
  });
};
