// src/middlewares/auth.middleware.js

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.sub,
      role: decoded.role,
      companyId: decoded.companyId,
      branchId: decoded.branchId,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permisos" });
    }
    next();
  };
};

// ✅ EXPORTACIÓN COMO OBJETO
module.exports = { authenticate, authorize };