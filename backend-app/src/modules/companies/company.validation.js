const { body, param } = require('express-validator');
const prisma = require('../../config/prisma');

// ─── Crear empresa ──────────────────────────────────────────
const createCompanyValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre es muy corto')
    .custom(async (name) => {
      const existing = await prisma.company.findFirst({
        where: { name },
      });

      if (existing) {
        throw new Error('Ya existe una empresa con ese nombre');
      }
      return true;
    }),

    body('ruc')
    .optional()
    .isLength({ min: 11, max: 11 })
    .withMessage('El RUC debe tener 11 dígitos')
    .custom(async (ruc) => {
        const existing = await prisma.company.findFirst({ where: { ruc } });
        if (existing) {
        throw new Error('El RUC ya está registrado');
        }
        return true;
    }),

  body('address')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Dirección inválida'),
];

// ─── Actualizar empresa ─────────────────────────────────────
const updateCompanyValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),

  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Nombre inválido')
    .custom(async (name, { req }) => {
      const existing = await prisma.company.findFirst({
        where: {
          name,
          NOT: { id: Number(req.params.id) },
        },
      });

      if (existing) {
        throw new Error('Ya existe otra empresa con ese nombre');
      }
      return true;
    }),

  body('ruc')
    .optional()
    .isLength({ min: 11, max: 11 })
    .withMessage('RUC inválido'),
];

// ─── Validar ID ─────────────────────────────────────────────
const idValidation = [
  param('id')
    .isInt().withMessage('ID inválido'),
];

module.exports = {
  createCompanyValidation,
  updateCompanyValidation,
  idValidation,
};