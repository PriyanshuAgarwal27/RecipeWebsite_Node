const express = require("express");
const app = express();
const cors = require("cors");
const recipeRouter = require("./routes/RecipeRouter");
const { userRouter } = require("./routes/UserRouter");
const PORT = 8000;
const { connectMongodb } = require("./connections/conectMogoDB");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const {
  restricteToLogedInUserOnly,
} = require("./middlewares/userLoginMiddleWare");
connectMongodb("mongodb://127.0.0.1:27017/recipe_data").then(() => {
  console.log("MongoDB connected");
});

app.use(express.json());
app.use(cookieParser());

app.use("/recipes", restricteToLogedInUserOnly, recipeRouter);
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log("Server Started!");
});
