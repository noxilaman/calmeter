require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    res.status(403).send({
      status: "Fail",
      statusCode: 403,
      message: "Empty token",
    });
    return;
  }

  try {
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decode;
    req.user.token = token;
  } catch (error) {
    res.status(404).send({
      status: "Fail",
      statusCode: 404,
      message: error,
    });
    return;
  }

  return next();
};

exports.verifyAdminToken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    res.status(403).send({
      status: "Fail",
      statusCode: 403,
      message: "Empty token",
    });
    return;
  }

  token.replace('Bearer ',''); 

  try {
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (decode.role != 'admin'){
        res.status(401).send({
          status: "unauthorized",
          statusCode: 401,
          message: "401 Unauthorized",
        });
        return;
    }
    
    req.user = decode;
    req.user.token = token;
  } catch (error) {
    res.status(404).send({
      status: "Fail",
      statusCode: 404,
      message: error,
    });
    return;
  }

  return next();
};

exports.refreshTokenValidate = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    res.status(403).send({
      status: "Fail",
      statusCode: 403,
      message: "Empty token",
    });
    return;
  }

  try {
    const decode = await jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    //console.log(decode);
    req.user = decode;
    req.user.token = token;
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Fail",
      statusCode: 404,
      message: error,
    });
    return;
  }

  return next();
};