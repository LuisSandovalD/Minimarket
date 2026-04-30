const router = require('express').Router();

const ctrl = require('./branch.controller');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');

const {
  createBranchValidation,
  updateBranchValidation,
  idValidation,
} = require('./branch.validation');

// 🔐 Auth global
router.use(authenticate);

// 🆕 CREATE
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  createBranchValidation,
  validate,
  ctrl.create
);

// 📋 LISTAR
router.get(
  '/',
  authorize('ADMIN', 'MANAGER'),
  ctrl.getAll
);

// 🔍 GET BY ID
router.get(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  idValidation,
  validate,
  ctrl.getById
);

// ✏️ UPDATE
router.put(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  updateBranchValidation,
  validate,
  ctrl.update
);

// 🗑 DELETE
router.delete(
  '/:id',
  authorize('ADMIN'),
  idValidation,
  validate,
  ctrl.remove
);

module.exports = router;