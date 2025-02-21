const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No existe el token" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "El token es invalido" });
  }
}

module.exports = {
  verifyToken
}