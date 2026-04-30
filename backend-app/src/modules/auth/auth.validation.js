const { body } = require('express-validator');

/**
 * 📝 VALIDACIÓN DE REGISTRO
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Formato de email inválido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

  body('role')
    .optional()
    .isIn(['ADMIN', 'MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'VIEWER'])
    .withMessage('Rol no permitido'),

  // 🔥 VALIDACIÓN DE EMPRESA
  body('company')
    .exists().withMessage('La información de la empresa es requerida')
    .isObject().withMessage('La empresa debe ser un objeto'),

  body('company.create')
    .exists().withMessage('Debe enviar company.create')
    .isObject().withMessage('company.create debe ser un objeto'),

  body('company.create.name')
    .trim()
    .notEmpty().withMessage('El nombre de la empresa es obligatorio'),

  body('company.create.ruc')
    .optional({ checkFalsy: true })
    .isString().withMessage('El RUC debe ser texto')
    .matches(/^\d{11}$/).withMessage('El RUC debe tener exactamente 11 dígitos'),

  body('company.create.address')
    .optional()
    .trim()
    .isString().withMessage('La dirección debe ser una cadena de texto'),
];

/**
 * 🔐 VALIDACIÓN DE LOGIN
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
];

module.exports = {
  registerValidation,
  loginValidation,
};