const authService = require('./auth.service');

/**
 * 📝 REGISTRO DE USUARIO Y EMPRESA
 */
const register = async (req, res, next) => {
  try {
    // 🔒 Validación mínima defensiva (por si falla express-validator)
    if (!req.body?.email || !req.body?.password || !req.body?.name) {
      return res.status(400).json({
        success: false,
        message: "Datos incompletos",
      });
    }

    const result = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "Usuario y empresa registrados exitosamente",
      data: {
        user: result.user,
        token: result.token,
        slug: result.slug,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 🔐 LOGIN DE USUARIO
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔒 Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son obligatorios",
      });
    }

    const result = await authService.login({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        user: result.user,
        token: result.token,
        slug: result.slug,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};