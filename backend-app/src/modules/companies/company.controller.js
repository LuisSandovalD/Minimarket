const companyService = require('./company.service');

// ─── Crear empresa ──────────────────────────────────────────
const create = async (req, res, next) => {
  try {
    const data = await companyService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// ─── Listar empresas ────────────────────────────────────────
const getAll = async (req, res, next) => {
  try {
    const data = await companyService.getAll(req.user); // 🔥 importante
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ─── Obtener empresa por ID ─────────────────────────────────
const getById = async (req, res, next) => {
  try {
    const data = await companyService.getById(Number(req.params.id));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ─── Actualizar empresa ─────────────────────────────────────
const update = async (req, res, next) => {
  try {
    const data = await companyService.update(
      Number(req.params.id),
      req.body
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ─── Eliminar empresa ───────────────────────────────────────
const remove = async (req, res, next) => {
  try {
    await companyService.remove(Number(req.params.id));
    res.json({ message: 'Empresa eliminada' });
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