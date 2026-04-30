const router = require('express').Router();
const { register, login } = require('./auth.controller');

// ✅ CORRECCIÓN: Desestructuramos para obtener la función 'authenticate'
const { authenticate } = require('../../middlewares/auth.middleware'); 

const { validate } = require('../../middlewares/validate.middleware');
const {
  registerValidation,
  loginValidation,
} = require('./auth.validation');

/**
 * @route   POST /api/auth/register
 */
router.post(
  '/register', 
  registerValidation, 
  validate, 
  register
);

/**
 * @route   POST /api/auth/login
 */
router.post(
  '/login', 
  loginValidation, 
  validate, 
  login
);

/**
 * @route   GET /api/auth/me
 * @desc    Obtener datos del usuario autenticado
 * @access  Private
 */
router.get(
  '/me', 
  authenticate, // 🔥 Ahora 'authenticate' es una función válida, no un objeto.
  (req, res) => {
    res.json({
      success: true,
      data: req.user
    });
  }
);

module.exports = router;