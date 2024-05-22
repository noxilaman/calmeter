const db = require("../models/index.model");
const Group = db.groups;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial

exports.findAll = async (req, res) => {
  const search = req.query?.search || "";
  const limit = req.query?.limit || 10;
  const page = req.query?.page || 1;
  var condition = search ? { name: { [Op.like]: `%${search}%` } } : null;
  var lim = limit ? limit : 10;
  var offs = page ? (page - 1) * lim : 0;

  await Group.findAndCountAll({
    where: condition,
    limit: parseInt(lim, 10),
    offset: parseInt(offs, 0),
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200);
      res.send({
        statusCode: 200,
        message: data,
        status: "OK",
        search: req.query?.search || "",
        limit: req.query?.limit || 10,
        page: req.query?.page || 1,
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        message: err.message || "Some error occurred while 500.",
      });
    });
};
exports.create = async (req, res) => {
  const { name, desc } = req.body;

  // Validate request
  if (!name) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "name can not be empty!",
    });
    return;
  }

  var tmpData = {
    name: name,
    desc: desc,
    status: "Active",
  };

  await Group.create(tmpData)
    .then((data) => {
      res.status(201);
      res.send({
        statusCode: 200,
        message: data,
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        status: "Error",
        statusCode: 500,
        message:
          err.message || "Some error occurred while retrieving groups.",
      });
    });
};
exports.findOne = async (req, res) => {
  // console.log("Viewing " + req.params.id);
  const id = req.params.id;

  // Validate request
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }

  await Group.findByPk(id)
    .then((data) => {
      res.status(200);
      res.send({
        statusCode: 200,
        message: data,
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        status: "Error",
        statusCode: 500,
        message:
          err.message || "Some error occurred while retrieving groups.",
      });
    });
};
exports.update = async (req, res) => {
  // console.log("Todo " + req.params.id + " updated");
  const id = req.params.id;
  const { name, desc } = req.body;

  // Validate request
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }
  if (!name) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "name can not be empty!",
    });
    return;
  }

  var tmpData = {
    name: name,
    desc: desc,
    status: "Active",
  };

  await Group.update(tmpData, {
    where: { id: id },
  })
    .then((data) => {
      res.status(200);
      res.send({
        statusCode: 200,
        message: data,
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        statusCode: 500,
        status: "Error",
        message:
          err.message || "Some error occurred while retrieving groups.",
      });
    });
};
exports.delete = async (req, res) => {
  // console.log("Delete " + req.params.id);
  const id = req.params.id;

  // Validate request
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }
  
  await Group.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200);
      res.send({ statusCode: 200, status: "OK", message: "deleted" });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        statusCode: 500,
        status: "Error",
        message:
          err.message || "Some error occurred while retrieving groups.",
      });
    });
};
