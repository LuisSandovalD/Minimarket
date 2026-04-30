const service = require('./user.service');

// 🆕 CREAR
const create = async (req, res, next) => {
  try {
    const data = await service.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'EMPLOYEE',
        branchId: req.body.branchId || null,
      },
      req.user // 🔥 IMPORTANTE
    );

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// 📋 LISTAR
const getAll = async (req, res, next) => {
  try {
    const data = await service.getAll({
      companyId: req.user.companyId,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 🔍 GET BY ID
const getById = async (req, res, next) => {
  try {
    const data = await service.getById(
      req.params.id,
      req.user.companyId
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ✏️ UPDATE
const update = async (req, res, next) => {
  try {
    const data = await service.update(
      req.params.id,
      req.body,
      req.user.companyId
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 🗑 DELETE
const remove = async (req, res, next) => {
  try {
    await service.remove(
      req.params.id,
      req.user.companyId
    );

    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};