const { userModel } = require("../model/userModel");
const { v4: uuidV4 } = require("uuid");
const { setUser } = require("../services/Auth");
const bcrypt = require("bcrypt");
async function userLoginInfo(req, res) {
  const { email, password } = req.body;
  try {
    const userInfo = await userModel
      .findOne({
        email,
      })
      .lean();

    if (!userInfo) {
      return res.status(404).json({ error: "email id does not exist" });
    }
    const secPassword = await bcrypt.compareSync(password, userInfo.password);
    if (secPassword) {
      return res.status(200).json({ userInfo });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.log("Error while fetching user info");
    return res.status(500).json({ status: "Internal Server error" });
  }
}
async function userSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "Bad request", message: "All fields are required. " });
    }
    const existingUser = await userModel.findOne({ email }).lean();
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "Bad request", message: "Email already present" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // const sessionId = uuidV4();
    const token = setUser(user);
    res.cookie("uid", token);
    return res.status(201).json({ status: "Successful!" });
  } catch (error) {
    console.log("Does not create user info", error);
    return res.status(500).json({ status: "Internal Server Error" });
  }
}

module.exports = {
  userLoginInfo,
  userSignUp,
};
