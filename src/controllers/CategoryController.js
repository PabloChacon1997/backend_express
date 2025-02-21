const Category = require("../models/Category");


class CategoryController {
  static getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({})
      res.json(categories);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
  
  static getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      if (!category) {
        const error = new Error('Cateoria no encontrada');
        return res.status(404).json({error: error.message});
      }
      res.json(category);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
  
  static createCategory = async(req, res) => {
    const category = new Category(req.body);
    try {
      
      await category.save();
      res.send('Categoria creada correctamente.!')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
}

module.exports = {
  CategoryController
}