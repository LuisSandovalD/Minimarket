const prisma = require('../../config/prisma');
const { hashPassword } = require('../utils/hash');
const { createError } = require('../../middlewares/error.middleware');

// 🔧 SLUG
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// 🆕 CREATE
const create = async (data, userLogged) => {
  if (!userLogged || !userLogged.companyId) {
    throw createError('No autorizado', 401);
  }

  const companyId = userLogged.companyId;

  // ✅ validar email por empresa
  const existing = await prisma.user.findFirst({
    where: {
      email: data.email,
      companyId,
    },
  });

  if (existing) {
    throw createError('El correo ya está registrado', 400);
  }

  // ✅ validar branch si viene
  if (data.branchId) {
    const branch = await prisma.branch.findFirst({
      where: {
        id: Number(data.branchId),
        companyId,
      },
    });

    if (!branch) {
      throw createError('Sucursal inválida para esta empresa', 400);
    }
  }

  // 🔐 hash password
  data.password = await hashPassword(data.password);

  // 🔗 slug único por empresa
  const baseSlug = generateSlug(data.name);
  let slug = baseSlug;
  let count = 1;

  while (
    await prisma.user.findFirst({
      where: {
        slug,
        companyId,
      },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  const user = await prisma.user.create({
    data: {
      ...data,
      slug,
      companyId,
    },
  });

  const { password, ...safeUser } = user;
  return safeUser;
};

// 📋 LISTAR
const getAll = async ({ companyId }) => {
  const users = await prisma.user.findMany({
    where: { companyId },
  });

  return users.map(({ password, ...u }) => u);
};

// 🔍 GET BY ID
const getById = async (id, companyId) => {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
      companyId,
    },
  });

  if (!user) throw createError('Usuario no encontrado', 404);

  const { password, ...safeUser } = user;
  return safeUser;
};

// ✏️ UPDATE
const update = async (id, data, companyId) => {
  await getById(id, companyId);

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  // ✅ validar branch si se actualiza
  if (data.branchId) {
    const branch = await prisma.branch.findFirst({
      where: {
        id: Number(data.branchId),
        companyId,
      },
    });

    if (!branch) {
      throw createError('Sucursal inválida', 400);
    }
  }

  // 🔒 proteger campos críticos
  delete data.companyId;
  delete data.slug;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data,
  });

  const { password, ...safeUser } = user;
  return safeUser;
};

// 🗑 DELETE
const remove = async (id, companyId) => {
  await getById(id, companyId);

  return prisma.user.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};