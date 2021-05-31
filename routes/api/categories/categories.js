const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Category = require("../../../models/Categories");

/**
 * @route GET api/categories
 * @description get all categories
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length <= 0) {
      return res
        .status(400)
        .json({ errors: { msg: "There is no categories available" } });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

/**
 * @route POST api/categories
 * @description post one category
 * @access private
 */

router.post("/", auth, async (req, res) => {
  const { name, color } = req.body;
  try {
    const isCategory = await Category.findOne({ name: name });

    if (isCategory)
      return res
        .status(400)
        .json({ error: { msg: "This category already exist" } });

    const category = new Category({
      name: name.toLowerCase(),
      color: color.toLowerCase(),
    });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

/**
 * @route PUT api/categories/category_id
 * @description update category color
 * @access private
 */

router.put("/:category_id", auth, async (req, res) => {
  const categoryId = req.params.category_id;
  const color = req.body.color;
  try {
    let category = await Category.findOne({ _id: categoryId });
    if (!category)
      return res.status(400).json({ errors: { msg: "Category not found" } });

    category = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { color } },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

module.exports = router;
