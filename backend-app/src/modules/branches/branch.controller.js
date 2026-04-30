const branchService = require('./branch.service');
const { validationResult } = require('express-validator');

// =========================
// 📋 LISTAR SUCURSALES
// Obtiene todas las sucursales vinculadas a la empresa del usuario autenticado
// =========================
const getAll = async (req, res, next) => {
  try {
    // Extraemos el ID de la empresa desde el token del usuario
    const companyId = req.user.companyId;

    const data = await branchService.getAll({ companyId });
    res.json(data);
  } catch (error) {
    // Si hay un error, lo enviamos al middleware de manejo de errores
    next(error);
  }
};

// =========================
// 🔍 OBTENER POR ID
// Busca una sucursal específica validando que pertenezca a la empresa actual
// =========================
const getById = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await branchService.getById(id, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// =========================
// 🆕 CREAR SUCURSAL
// Registra una nueva sucursal tras validar los datos de entrada
// =========================
const create = async (req, res, next) => {
  try {
    // 🛡️ Validación: Verificamos si express-validator detectó errores en los datos enviados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;

    const data = await branchService.create(req.body, companyId);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// =========================
// ✏️ ACTUALIZAR SUCURSAL
// Modifica los datos de una sucursal existente (Dirección, nombre, etc.)
// =========================
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await branchService.update(id, req.body, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// =========================
// 🗑 ELIMINAR SUCURSAL
// Remueve la sucursal del sistema (generalmente mediante borrado lógico o físico)
// =========================
const remove = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    await branchService.remove(id, companyId);
    res.json({ message: 'Sucursal eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};