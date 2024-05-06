const { userModel } = require("../model/userModel");
const { v4: uuidV4 } = require("uuid");
const { setUser } = require("../services/Auth");

async function userLoginInfo(req, res) {
  const { email, password } = req.body;
  try {
    const userInfo = await userModel.findOne({
      email,
      password,
    });
    if (!userInfo) {
      return res.status(404).json({ error: "No information received" });
    }
    return res.status(200).json({ userInfo });
  } catch (error) {
    console.assert(!error, "Error while fetching user info");
    return res.status(500).json({ status: "Internal Server error" });
  }
}
async function userSignUp(req, res) {
  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const sessionId = uuidV4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.status(201).json({ status: "Successfull!" });
  } catch (error) {
    console.assert(!error, "Deos not create user info");
    res.status(500).json({ status: "Internal Server Error" });
  }
}

module.exports = {
  userLoginInfo,
  userSignUp,
};
