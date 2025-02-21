const Token = require("../models/token");
const User = require("../models/Users");
const { hashPassword, checkPassword } = require("../utils/auth");
const { generateToken } = require("../utils/token");


class AuthController {
  static createAccount = async (req, res) => {
    try {
      const user = new User(req.body)
      const { email, password , name} = req.body
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("Un usuario con este correo ya existe");
        return res.status(409).json({error: error.message});
      }
      user.password = await hashPassword(password);

      const token = new Token();
      token.token = generateToken(name, process.env.SECRET_KEY);
      token.user = user.id;
      await Promise.allSettled([user.save(), token.save()]);
      res.json(token);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if (!user) {
        const error = new Error('Usuario no encotrado!!!');
        return res.status(401).json({error: error.message});
      }

      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error('El password es incorrecto!!!');
        return res.status(401).json({error: error.message});
      }

      const token = generateToken(user.name, process.env.SECRET_KEY);
      res.send(token)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }
}

module.exports = {
  AuthController
}