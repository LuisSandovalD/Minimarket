const router = require('express').Router();

const ctrl = require('./category.controller');

const {
  authenticate,
  authorize,
} = require('../../middlewares/auth.middleware');

const { validate } = require('../../middlewares/validate.middleware');

const {
  createCategoryValidation,
  updateCategoryValidation,
  idValidation,
} = require('./category.validation');

// 🔐 Auth global
router.use(authenticate);

// 🆕 CREATE CATEGORY
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  createCategoryValidation,
  validate,
  ctrl.create
);

// 📋 LISTAR CATEGORÍAS
router.get(
  '/',
  authorize('ADMIN', 'MANAGER'),
  ctrl.getAll
);

// 🔍 GET CATEGORY BY ID
router.get(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  idValidation,
  validate,
  ctrl.getById
);

// ✏️ UPDATE CATEGORY
router.put(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  updateCategoryValidation,
  validate,
  ctrl.update
);

// 🗑 DELETE CATEGORY
router.delete(
  '/:id',
  authorize('ADMIN'),
  idValidation,
  validate,
  ctrl.remove
);

module.exports = router;