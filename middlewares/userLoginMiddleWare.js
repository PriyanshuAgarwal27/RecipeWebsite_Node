const { getUser } = require("../services/Auth");

async function restricteToLogedInUserOnly(req, res, next) {
  const token = req?.headers?.auth;
  if (!token) {
    return res.status(404).json({ error: "Uid not available" });
  }
  const user = getUser(token);
  if (!user) {
    return res.status(404).json({ error: "user not available" });
  }
  req.user = user;
  next();
}
module.exports = { restricteToLogedInUserOnly };
