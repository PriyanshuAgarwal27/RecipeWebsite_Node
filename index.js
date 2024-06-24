const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const recipeRouter = require("./routes/RecipeRouter");
const { userRouter } = require("./routes/UserRouter");
const PORT = 8000;
const { connectMongodb } = require("./connections/conectMogoDB");
const cookieParser = require("cookie-parser");
const {
  restricteToLogedInUserOnly,
} = require("./middlewares/userLoginMiddleWare");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

connectMongodb(process.env.REACT_APP_MONGODB_API).then(() => {
  console.log("MongoDB connected");
});

app.use(cookieParser());
app.use(express.json());

app.use("/recipes", restricteToLogedInUserOnly, recipeRouter);
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log("Server Started!");
});
