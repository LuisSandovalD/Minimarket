const { body, param } = require('express-validator');
const prisma = require('../../config/prisma');

// =========================
// CREATE CATEGORY
// =========================
const createCategoryValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.category.findFirst({
        where: { name, companyId }
      });

      if (exists) {
        throw new Error('Nombre ya en uso en la empresa');
      }
    }),

  body('slug')
    .not()
    .exists()
    .withMessage('No está permitido enviar slug'),

  // 🔒 seguridad
  body('companyId')
    .not()
    .exists()
    .withMessage('No está permitido enviar companyId'),
];


// =========================
// UPDATE CATEGORY
// =========================
const updateCategoryValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.category.findFirst({
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
  createCategoryValidation,
  updateCategoryValidation,
  idValidation,
};