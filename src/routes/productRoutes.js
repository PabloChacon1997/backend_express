const { Router } = require('express');
const { body, param } = require('express-validator');

const { handleInputErrors } = require('../middleware/validation');
const { ProductController } = require('../controllers/ProductController');
const { verifyToken } = require('../middleware/auth');

const router = Router();

router.post('/',
  verifyToken,
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del producto es obligatoria.'),
  body('price')
    .isNumeric().withMessage('El precio del producto es obligatorio.'),
  body('stock')
    .isNumeric().withMessage('El stock del producto es obligatorio.'),
  handleInputErrors
  ,(req, res) => ProductController.createProduct(req, res));

  router.get('/', verifyToken,(req, res) => ProductController.getAllProducts(req, res));
  router.get('/:id',
    verifyToken,
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors
    ,(req, res) => ProductController.getProductById(req, res));
  router.put('/:id',
    verifyToken,
    param('id').isMongoId().withMessage('ID no válido'),
    body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('description')
      .notEmpty().withMessage('La descripción del producto es obligatoria.'),
    body('price')
      .isNumeric().withMessage('El precio del producto es obligatorio.'),
    body('stock')
      .isNumeric().withMessage('El stock del producto es obligatorio.'),
    handleInputErrors
    ,(req, res) => ProductController.updateProduct(req, res));


  router.delete('/:id',
    verifyToken,
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors
    ,(req, res) => ProductController.deleteProduct(req, res));

module.exports = router;