require("express-group-routes");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());

app.use(cors());

const db = require("./src/models/index.model");
db.sequelize
  .sync()
  .then(() => {
    //console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const version = process.env.API_VERSION;

console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.group("/api/v" + version, (router) => {
  
  const GroupRoute = require("./src/routes/groups.route");
  router.use("/", GroupRoute);

  router.use("/", (req, res) => {
    res.status(200).send({
      message: "Calcualte meter webservice API",
      statusCode: 200,
      status: "OK"
    });
  });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
