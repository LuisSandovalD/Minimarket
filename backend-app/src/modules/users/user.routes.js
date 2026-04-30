const router = require('express').Router();
const ctrl = require('./user.controller');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const {
  createUserValidation,
  updateUserValidation,
  idValidation,
} = require('./user.validation');

// 🔐 TODOS requieren login
router.use(authenticate);

// 🆕 CREAR
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  createUserValidation,
  validate,
  ctrl.create
);

// 📋 LISTAR
router.get(
  '/',
  authorize('ADMIN', "MANAGER"),
  ctrl.getAll
);

// 🔍 OBTENER POR ID
router.get(
  '/:id',
  authorize('ADMIN', 'MANAGER'), // 🔥 agregado
  idValidation,
  validate,
  ctrl.getById
);

// ✏️ ACTUALIZAR
router.put(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  idValidation, // 🔥 faltaba aquí
  updateUserValidation,
  validate,
  ctrl.update
);

// 🗑 ELIMINAR
router.delete(
  '/:id',
  authorize('ADMIN'),
  idValidation,
  validate,
  ctrl.remove
);

module.exports = router;