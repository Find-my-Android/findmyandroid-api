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
  Route: /phone/get/:software_id
  Selects a phone for the logged in user with a software_id.
*/
exports.getPhone = async (req, res) => {
  const query = "SELECT * FROM phone WHERE software_id = ? and user_id = ?";
  const params = [req.params.software_id, req.user.user_id];

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
  const query = "DELETE FROM phone WHERE software_id = ? AND user_id = ?";
  const params = [req.body.software_id, req.user.user_id];

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
    "UPDATE phone SET name = ?, tracking_state = ?, stolen_state = ? WHERE software_id = ? and user_id = ?";
  const params = [
    req.body.name,
    req.body.tracking_state,
    req.body.stolen_state,
    req.body.software_id,
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
    "UPDATE phone SET latitude = ?, longitude = ?, last_tracked = NOW() WHERE software_id = ? and user_id = ?";
  const params = [
    req.body.latitude,
    req.body.longitude,
    req.body.software_id,
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
    req.body.software_id,
    req.user.user_id,
    req.body.name,
    req.body.phone_num,
    -1, //latitude
    -1, //longitude
    1, //tracking_state
    0, //stolen_state
    0, //sim_removed
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
