import db from "../models/index.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { users: User, groups: Group } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial

exports.findAll = async (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit;
  const page = req.query.page;
  var condition = search ? { name: { [Op.like]: `%${search}%` } } : null;
  var lim = limit ? limit : 10;
  var offs = page ? (page -1 ) * lim : 0;

  console.log(page);

  await User.findAndCountAll({
    include: [Shop],
    where: condition,
    limit: parseInt(lim, 10),
    offset: parseInt(offs, 0),
    order: [["createdAt", "DESC"]]
  })
    .then((data) => {
      res.status(200);
      res.send({
        statusCode: 200,
        message: data,
        status: "OK",
        search: req.query.search ? req.query.search : "",
        limit: req.query.limit ? req.query.limit : 10,
        page: req.query.page ? req.query.page : 1,
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
  const { username, name, email, password, token, role, group_id } = req.body;

  // Validate request
  if (!username) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "username can not be empty!",
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
  if (!email) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "email can not be empty!",
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "password can not be empty!",
    });
    return;
  }
  if (!role) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "role can not be empty!",
    });
    return;
  }
  if (!group_id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "group_id can not be empty!",
    });
    return;
  }
  var encyptedPassword = await bcrypt.hash(password, 10);
  if (!encyptedPassword) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "encyptedPassword can not be empty!",
    });
    return;
  }
  var tmpData = {
    username: username,
    name: name,
    email: email,
    password: encyptedPassword,
    token: token,
    role: role,
    group_id: group_id,
    status: "Active",
  };

  await User.create(tmpData)
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
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.findOne = async (req, res) => {
  console.log("Viewing " + req.params.id);
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }

  await User.findByPk(id)
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
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.update = async (req, res) => {
  console.log("Todo " + req.params.id + " updated");
  const id = req.params.id;
  
  const { username, name, email, password, token, role, group_id } = req.body;

  // Validate request
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }
  if (!username) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "username can not be empty!",
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
  if (!email) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "email can not be empty!",
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "password can not be empty!",
    });
    return;
  }
  if (!role) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "role can not be empty!",
    });
    return;
  }
  if (!group_id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "group_id can not be empty!",
    });
    return;
  }
  var encyptedPassword = await bcrypt.hash(password, 10);
  if (!encyptedPassword) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "encyptedPassword can not be empty!",
    });
    return;
  }
  var tmpData = {
    username: username,
    name: name,
    email: email,
    password: encyptedPassword,
    token: token,
    role: role,
    group_id: group_id,
    status: "Active",
  };

  await User.update(tmpData, {
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
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.delete = async (req, res) => {
  console.log("Delete " + req.params.id);
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }

  await User.destroy({
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
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.changestatus = async (req, res) => {
  console.log("Todo " + req.params.id + " updated");
  const id = req.params.id;
  const status = req.params.status;

  // Validate request
  if (!id) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "id can not be empty!",
    });
    return;
  }
  if (!status) {
    res.status(400).send({
      status: "Fail",
      statusCode: 400,
      message: "status can not be empty!",
    });
    return;
  }
  var tmpData = {
    status: status,
  };

  await User.update(tmpData, {
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
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};