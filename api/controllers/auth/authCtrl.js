const user = require("../../models/user");
const JWT = require("jsonwebtoken");
const { blockList } = require("../../redis/blockList");
const { allowList } = require("../../redis/allowList");
const moment = require("moment");

require("dotenv").config();
const crypto = require("crypto");

function generateTokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateWebToken(user) {
  return JWT.sign({ user: user._id }, process.env.SECRET, {
    expiresIn: "2d",
  });
}

async function isInBlockList(token) {
  const key = generateTokenHash(token);
  return await blockList.verifyList(key);
}
async function generateRefreshToken(user) {
  const refreshToken = crypto.randomBytes(24).toString("hex");
  const expirationDate = moment().add(2, "d").unix();
  await allowList.addToList(refreshToken, user.login, expirationDate);
  return refreshToken;
}

async function generateTokens(user) {
  const token = generateWebToken(user);
  const refreshToken = await generateRefreshToken(user);
  return { token, refreshToken };
}

const login = async (req, res) => {
  const { body } = req;
  user.findOne({ login: body.login }, async (err, user) => {
    if (err) {
      return res.status(500).json({ sucess: false, message: err });
    }
    if (!user.comparePassword(body.password)) {
      return res.status(401).json({ sucess: false, message: "Wrong Password" });
    }
    const tokens = await generateTokens(user);
    const userToReturn = { login: user.login, name: user.name };
    return res.status(200).json({ sucess: true, tokens, user: userToReturn });
  });
};

const authorization = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  let user_id;
  JWT.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(401).json({ sucess: false, message: err });
    user_id = decoded.user;
  });
  if (await isInBlockList(token)) {
    return res
      .status(401)
      .json({ sucess: false, message: "Token Invalid Blocklist" });
  }
  user.findOne({ _id: user_id }, (err, user) => {
    if (!user) {
      return res
        .status(401)
        .json({ sucess: false, message: "No user With this token" });
    }
    next();
  });
};

const logout = async (req, res) => {
  const token = req.headers["x-access-token"];
  const expirationDate = JWT.decode(token).exp;
  console.log(expirationDate);
  const key = generateTokenHash(token);
  await blockList.addToList(key, "", expirationDate);
  return res.status(200).json({ sucess: true, message: "Logout succeed" });
};

module.exports = { login, authorization, logout };
