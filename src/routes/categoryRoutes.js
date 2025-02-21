const { Router } = require('express');
const { body, param } = require('express-validator');
const { CategoryController } = require('../controllers/CategoryController');
const { handleInputErrors } = require('../middleware/validation');
const { verifyToken } = require('../middleware/auth');

const router = Router();

router.post('/',
  verifyToken, 
  body('name')
    .notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors
  ,(req, res) => CategoryController.createCategory(req, res));

router.get('/', verifyToken,(req, res) => CategoryController.getAllCategories(req, res));
router.get('/:id',
  verifyToken,
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors
  , (req, res) => CategoryController.getCategoryById(req, res));

module.exports = router;