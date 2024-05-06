const express = require("express");
const app = express();
const recipeRouter = require("./routes/RecipeRouter");
const { userRouter } = require("./routes/UserRouter");
const PORT = 8000;
const { connectMongodb } = require("./connections/conectMogoDB");
const cookieParser = require("cookie-parser");
const {
  restricteToLogedInUserOnly,
} = require("./middlewares/userLoginMiddleWare");
connectMongodb("mongodb://127.0.0.1:27017/recipe_data").then(() => {
  console.log("MongoDB connected");
});

app.use(express.json());
app.use(cookieParser());

app.use("/recipes", recipeRouter);
app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log("Server Started!");
});