const recipeModel = require("../model/recipeModel");

async function getAllRecipes(req, res) {
  try {
    const recipes = await recipeModel.find({});
    if (!recipes) {
      return res.status(404).json("Not found");
    }
    return res.status(200).json(recipes);
  } catch (error) {
    console.assert(!error, "Error in fetching recipes");
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNewRecipe(req, res) {
  try {
    await recipeModel.create({
      authorName: req.body.authorName,
      recipeName: req.body.recipeName,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      tags: req.body.tags,
      ingredients: req.body.ingredients,
      recipeSteps: req.body.recipeSteps,
      // createdBy: req.users._id,
    });
    return res.status(201).json("Created Successfully!!");
  } catch (err) {
    console.assert(!err, "Error creating Recipes");
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getRecipeById(req, res) {
  try {
    const recipeId = req.params.recipeId;
    const getUserById = await recipeModel.findById(recipeId);
    if (!getUserById) {
      return res
        .status(404)
        .json({ error: "Recipe not found with given recipeId" });
    }
    return res.status(200).json(getUserById);
  } catch (err) {
    console.assert(!err, "Error in getting recipe by id");
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function updateRecipeById(req, res) {
  const recipeId = req.params.recipeId;
  const newImage = req.file;
  if (!recipeId) {
    return res
      .status(404)
      .json({ error: "Recipe not found with given recipeId" });
  }
  await recipeModel.findByIdAndUpdate(recipeId, {
    authorName: req.body.authorName,
    recipeName: req.body.recipeName,
    imageUrl: "/uploads/" + newImage.fileName,
    description: req.body.description,
    tags: req.body.tags,
    ingredients: req.body.ingredients,
    recipeSteps: req.body.recipeSteps,
  });
  return res.json({ status: "Successfully Updated!" });
}
async function deleteRecipeById(req, res) {
  try {
    const { recipeId: Id } = req.params.recipeId;
    const deletedData = await recipeModel.findByIdAndDelete(Id);
    if (!deletedData) {
      return res.status(404).json({ error: "Recipe Not found" });
    }
    return res.status(200).json({ status: "Successfully Deleted" });
  } catch (err) {
    console.assert(!err, "Error in deleting Recipes");
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}

module.exports = {
  getAllRecipes,
  createNewRecipe,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
