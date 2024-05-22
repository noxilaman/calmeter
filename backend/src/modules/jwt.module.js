require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.jwtGenToken = (user) => {

  // console.log(user.id);

  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      shop_id: user.shop_id,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "2h" }
  );
//  console.log(accessToken);
  return accessToken;
};

exports.jwtRefreshGenToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      shop_id: user.shop_id,
    },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "2d" }
  );

  return accessToken;
};
