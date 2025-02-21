const Category = require('../models/Category');
const Product = require('../models/Product');

class ProductController {
  static createProduct = async(req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
      const error = new Error('Cateoria no encontrada');
      return res.status(404).json({error: error.message});
    }
    try {
      const product = new Product(req.body);
      product.category = category.id;
      category.product.push(product.id)
      await product.save();
      await category.save();
      res.send('Producto creado correctamente!')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static getAllProducts = async(req, res) => {
    try {
      const product = await Product.find({}).populate('category');
      res.json(product);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static getProductById = async(req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).populate('category');
      if (!product) {
        const error = new Error('Producto no encontrado');
        return res.status(404).json({error: error.message});
      }
      res.json(product);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
  
  static updateProduct = async(req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        const error = new Error('Producto no encontrado');
        return res.status(404).json({error: error.message});
      }
      res.send('Producto actualizado correctamente');
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static deleteProduct = async(req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        const error = new Error('Producto no encontrado');
        return res.status(404).json({error: error.message});
      }

      const category = await Category.findById(product.category)
      category.product = category.product.filter( p => p.toString() !== id);
      await product.deleteOne(product);
      await category.save();
      res.send('Producto eliminado correctamente');
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
}

module.exports = {
  ProductController
}