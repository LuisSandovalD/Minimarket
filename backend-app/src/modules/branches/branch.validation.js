const { body, param } = require('express-validator');
const prisma = require('../../config/prisma');

// =========================
// CREATE
// =========================
const createBranchValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.branch.findFirst({
        where: { name, companyId }
      });

      if (exists) {
        throw new Error('Ya existe una sucursal con ese nombre');
      }
    }),

  // ❌ slug eliminado → lo genera el backend

  body('address')
    .notEmpty().withMessage('La dirección es obligatoria'),

  body('phone')
    .optional()
    .isString().withMessage('El teléfono debe ser texto'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive debe ser booleano'),

  // 🔒 seguridad
  body('companyId')
    .not()
    .exists()
    .withMessage('No está permitido enviar companyId'),
];

// =========================
// UPDATE
// =========================
const updateBranchValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.branch.findFirst({
        where: { name, companyId }
      });

      if (exists && exists.id !== Number(req.params.id)) {
        throw new Error('Nombre ya en uso en la empresa');
      }
    }),

  // 🔒 NO permitir modificar slug
  body('slug')
    .not()
    .exists()
    .withMessage('No está permitido modificar el slug'),

  body('address')
    .optional()
    .notEmpty().withMessage('La dirección no puede estar vacía'),

  body('phone')
    .optional()
    .isString().withMessage('El teléfono debe ser texto'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive debe ser booleano'),

  // 🔒 seguridad
  body('companyId')
    .not()
    .exists()
    .withMessage('No está permitido modificar companyId'),
];

// =========================
// ID
// =========================
const idValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),
];

module.exports = {
  createBranchValidation,
  updateBranchValidation,
  idValidation,
};