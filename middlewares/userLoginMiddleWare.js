const { getUser } = require("../services/Auth");

async function restricteToLogedInUserOnly(req, res, next) {
  // console.log(req);
  const userUid = req.cookies?.uid;
  // console.log({ userUid });
  if (!userUid) {
    return res.status(404).json({ error: "Uid not availabel" });
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(404).json({ error: "user not availabel" });
  }
  req.user = user;
  // console.log(req.user);
  next();
}
module.exports = { restricteToLogedInUserOnly };
