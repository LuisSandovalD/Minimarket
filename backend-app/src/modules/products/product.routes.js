const router = require('express').Router();

const ctrl = require('./product.controller');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');

const {
  createProductValidation,
  updateProductValidation,
  idValidation,
} = require('./product.validation');

// 🔐 Auth global
router.use(authenticate);

// 🆕 CREATE PRODUCT
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  createProductValidation,
  validate,
  ctrl.create
);

// 📋 LISTAR PRODUCTOS
router.get(
  '/',
  authorize('ADMIN', 'MANAGER'),
  ctrl.getAll
);

// 🔍 GET PRODUCT BY ID
router.get(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  idValidation,
  validate,
  ctrl.getById
);

// ✏️ UPDATE PRODUCT
router.put(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  updateProductValidation,
  validate,
  ctrl.update
);

// 🗑 DELETE PRODUCT
router.delete(
  '/:id',
  authorize('ADMIN'),
  idValidation,
  validate,
  ctrl.remove
);

module.exports = router;