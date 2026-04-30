const jwt = require("jsonwebtoken");

/**
 * 🔐 GENERAR TOKEN
 */
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
  }

  if (!user?.id) {
    throw new Error("No se puede generar token sin user.id");
  }

  return jwt.sign(
    {
      sub: user.id, // estándar JWT
      role: user.role,
      companyId: user.companyId,
      branchId: user.branchId ?? null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

/**
 * 🔓 VERIFICAR TOKEN
 */
const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token no proporcionado");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * 🔍 DECODIFICAR SIN VERIFICAR (opcional)
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};