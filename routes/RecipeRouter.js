const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getAllRecipes,
  createNewRecipe,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require("../controllers/handleRequest");

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, "uploadPath");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router
  .route("/")
  .get(getAllRecipes)
  .post(upload.single("imageUrl"), createNewRecipe);

router.route("/:recipeId").get(getRecipeById).delete(deleteRecipeById);
router.route("/:recipeId/update").put(updateRecipeById);

module.exports = router;
