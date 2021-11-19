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
  Route: /phone/get/:imei
  Selects a phone for the logged in user with an IMEI.
*/
exports.getPhone = async (req, res) => {
  const query = "SELECT * FROM phone WHERE imei = ? and user_id = ?";
  const params = [req.params.imei, req.user.user_id];

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
exports.deletePhone = async (req, res) => {
  const query = "DELETE phone WHERE imei = ? AND user_id = ?";
  const params = [req.body.imei, req.user.user_id];

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

/*
  Route: /phone/create
  Creates a new phone object with the default settings
*/
exports.createPhone = async (req, res) => {
  const query = "INSERT INTO phone VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)";
  const params = [
    req.body.imei,
    req.user.user_id,
    req.body.name,
    req.body.phone_num,
    0,
    0,
    0,
    0,
    0,
  ];

  //Connect to the database and run the query
  connection.query(query, params, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send({
      ok: true,
    });
  });
};
