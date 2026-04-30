const router = require('express').Router();
const ctrl = require('./company.controller');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const {
  createCompanyValidation,
  updateCompanyValidation,
  idValidation,
} = require('./company.validation');

router.use(authenticate);

// Solo ADMIN debería gestionar empresas
router.post('/', authorize('ADMIN'), createCompanyValidation, validate, ctrl.create);
router.get('/', authorize('ADMIN'), ctrl.getAll);
router.get('/:id', authorize('ADMIN'), idValidation, validate, ctrl.getById);
router.put('/:id', authorize('ADMIN'), updateCompanyValidation, validate, ctrl.update);
router.delete('/:id', authorize('ADMIN'), idValidation, validate, ctrl.remove);

module.exports = router;