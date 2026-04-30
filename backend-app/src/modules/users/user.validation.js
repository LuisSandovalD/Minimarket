const { body, param } = require('express-validator');
const prisma = require('../../config/prisma');

// 🆕 CREATE
const createUserValidation = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const companyId = req.user?.companyId || req.body.companyId;

      if (!companyId) {
        throw new Error('companyId es requerido');
      }

      const exists = await prisma.user.findFirst({
        where: {
          email,
          companyId,
        },
      });

      if (exists) {
        throw new Error('El email ya está registrado en esta empresa');
      }
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }),

  body('role')
    .optional()
    .isIn(['ADMIN', 'MANAGER', 'EMPLOYEE']),

  body('branchId')
    .optional()
    .isInt().withMessage('branchId debe ser un número')
    .custom(async (branchId, { req }) => {
      const companyId = req.user?.companyId || req.body.companyId;

      const branch = await prisma.branch.findFirst({
        where: {
          id: Number(branchId),
          companyId,
        },
      });

      if (!branch) {
        throw new Error('Sucursal no válida para esta empresa');
      }
    }),

  // 🟢 SOLO PARA PRUEBAS (puedes quitar luego)
  body('companyId')
    .optional()
    .isInt().withMessage('companyId debe ser número'),
];

// ✏️ UPDATE
const updateUserValidation = [
  param('id').isInt(),

  body('email')
    .optional()
    .isEmail()
    .custom(async (email, { req }) => {
      const companyId = req.user?.companyId;

      const exists = await prisma.user.findFirst({
        where: {
          email,
          companyId,
        },
      });

      if (exists && exists.id !== Number(req.params.id)) {
        throw new Error('Email ya en uso');
      }
    }),

  body('password')
    .optional()
    .isLength({ min: 6 }),
];

// 🔍 ID
const idValidation = [
  param('id').isInt(),
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  idValidation,
};