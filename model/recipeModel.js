const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  authorName: {
    type: String,
    require: true,
  },
  recipeName: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  tags: {
    type: [String],
  },
  ingredients: {
    type: String,
    get: function (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        return error;
      }
    },
    set: function (data) {
      return JSON.stringify(data);
    },
  },
  recipeSteps: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInfo",
  },
});

const recipeModel = mongoose.model("recipeDataUser", recipeSchema);
module.exports = recipeModel;
