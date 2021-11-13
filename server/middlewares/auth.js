const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Nono t no register");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    console.log(token)
    if (!token) {
      const error = new Error("Token incorrect");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        next();
      } catch {
        const error = new Error("Token incorrecto");
        error.code = 401;
        next(error);
      }
    }
  }
}

module.exports = Auth;