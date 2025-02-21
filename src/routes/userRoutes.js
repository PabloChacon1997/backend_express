const { Router } = require("express");
const { AuthController } = require("../controllers/AuthController");
const { body } = require("express-validator");
const { handleInputErrors } = require("../middleware/validation");


const router = Router();

router.post('/register', 
  body('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
  body('password')
    .isLength({min: 8}).withMessage('El password es muy corto, minimo 8 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Los passwords no son iguales')
    }
    return true;
  }),
  body('email')
    .isEmail().withMessage('El email no es valido'),
    handleInputErrors
  ,(req, res) => AuthController.createAccount(req, res));


router.post('/login',
  body('email')
    .isEmail().withMessage('El email no es valido'),
  body('password')
    .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
  (req, res) => AuthController.login(req, res));

module.exports = router;