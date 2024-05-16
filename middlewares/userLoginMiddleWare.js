const { getUser } = require("../services/Auth");

async function restricteToLogedInUserOnly(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    return res.status(404).json({ error: "Uid not availabel" });
  }
  const user = getUser(token);
  if (!user) {
    return res.status(404).json({ error: "user not availabel" });
  }
  req.user = user;
  next();
}
module.exports = { restricteToLogedInUserOnly };
