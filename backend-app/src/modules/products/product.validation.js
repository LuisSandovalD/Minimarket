const { body, param } = require('express-validator');
const prisma = require('../../config/prisma');

// =========================
// CREATE PRODUCT
// =========================
const createProductValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.product.findFirst({
        where: { name, companyId }
      });

      if (exists) {
        throw new Error('Nombre ya en uso en la empresa');
      }
    }),

  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),

  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),

  body('sku')
    .optional()
    .isString().withMessage('El SKU debe ser texto'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive debe ser booleano'),

  body('categoryId')
    .notEmpty().withMessage('categoryId es obligatorio')
    .isInt().withMessage('categoryId debe ser un número entero'),

  // 🔒 seguridad
  body('companyId')
    .not()
    .exists()
    .withMessage('No está permitido enviar companyId'),

  body('slug')
    .not()
    .exists()
    .withMessage('No está permitido enviar slug'),
];

// =========================
// UPDATE PRODUCT
// =========================
const updateProductValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .custom(async (name, { req }) => {
      const companyId = req.user.companyId;

      const exists = await prisma.product.findFirst({
        where: { name, companyId }
      });

      if (exists && exists.id !== Number(req.params.id)) {
        throw new Error('Nombre ya en uso en la empresa');
      }
    }),

  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),

  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),

  body('sku')
    .optional()
    .isString().withMessage('El SKU debe ser texto'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive debe ser booleano'),

  body('categoryId')
    .optional()
    .isInt().withMessage('categoryId debe ser un número entero'),

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
  createProductValidation,
  updateProductValidation,
  idValidation,
};