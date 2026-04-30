const prisma = require('../../config/prisma');
const { createError } = require('../../middlewares/error.middleware');

// 🔧 GENERADOR DE SLUG
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

// 🔒 VALIDACIÓN BÁSICA
const validateBranchData = (data) => {
  if (!data.name || !data.name.trim()) {
    throw createError("El nombre es obligatorio", 400);
  }
};

// 🔁 GENERAR SLUG ÚNICO (optimizado)
const generateUniqueSlug = async (name, companyId) => {
  const baseSlug = generateSlug(name);

  const existingSlugs = await prisma.branch.findMany({
    where: {
      slug: { startsWith: baseSlug },
      companyId,
    },
    select: { slug: true },
  });

  const slugs = existingSlugs.map((s) => s.slug);

  let slug = baseSlug;
  let count = 1;

  while (slugs.includes(slug)) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};

// 🆕 CREAR BRANCH
const create = async (data, companyId) => {
  validateBranchData(data);

  // validar nombre único
  const existingName = await prisma.branch.findFirst({
    where: { name: data.name, companyId },
  });

  if (existingName) {
    throw createError("Ya existe una sucursal con ese nombre", 400);
  }

  // generar slug único
  const slug = await generateUniqueSlug(data.name, companyId);

  try {
    const branch = await prisma.branch.create({
      data: {
        ...data,
        slug,
        companyId,
      },
    });

    return branch;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError("El slug ya está en uso", 400);
    }
    throw error;
  }
};

// 📋 LISTAR
const getAll = async ({ companyId }) => {
  return await prisma.branch.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

// 🔍 GET BY ID
const getById = async (id, companyId) => {
  const branch = await prisma.branch.findFirst({
    where: {
      id: Number(id),
      companyId,
    },
  });

  if (!branch) {
    throw createError("Sucursal no encontrada", 404);
  }

  return branch;
};

// ✏️ UPDATE
const update = async (id, data, companyId) => {
  const branch = await getById(id, companyId);

  validateBranchData({
    name: data.name ?? branch.name,
  });

  // validar nombre único si cambia
  if (data.name) {
    const exists = await prisma.branch.findFirst({
      where: {
        name: data.name,
        companyId,
        NOT: { id: Number(id) },
      },
    });

    if (exists) {
      throw createError("Nombre ya en uso en la empresa", 400);
    }
  }

  // 🚫 seguridad
  delete data.companyId;
  delete data.slug;

  const updated = await prisma.branch.update({
    where: { id: Number(id) },
    data,
  });

  return updated;
};

// 🗑 DELETE
const remove = async (id, companyId) => {
  await getById(id, companyId);

  return await prisma.branch.delete({
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