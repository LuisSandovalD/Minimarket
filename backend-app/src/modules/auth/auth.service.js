const prisma = require('../../config/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { createError } = require('../../middlewares/error.middleware');
const { userSelect } = require("../users/user.select");

// =========================
// 🔧 UTIL: SLUG
// =========================
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// =========================
// 🆕 REGISTER
// =========================
const register = async (data) => {
  try {
    // 🔒 Validación defensiva
    if (!data?.email || !data?.password || !data?.name) {
      throw createError("Datos incompletos", 400);
    }

    if (!data.company?.create?.name) {
      throw createError("Datos de empresa inválidos", 400);
    }

    return await prisma.$transaction(async (tx) => {

      // 1. Verificar email único (extra seguridad)
      const existingUser = await tx.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw createError("El correo ya está registrado", 400);
      }

      // 2. Hash password
      const hashed = await hashPassword(data.password);

      // =========================
      // 🏢 SLUG EMPRESA
      // =========================
      const baseCompanySlug = generateSlug(data.company.create.name);
      let companySlug = baseCompanySlug;
      let count = 1;

      while (await tx.company.findUnique({ where: { slug: companySlug } })) {
        companySlug = `${baseCompanySlug}-${count++}`;
      }

      // =========================
      // 🏬 CREAR EMPRESA
      // =========================
      const company = await tx.company.create({
        data: {
          name: data.company.create.name,
          slug: companySlug,
          ruc: data.company.create.ruc || null,
          address: data.company.create.address,
        },
      });

      // =========================
      // 👤 SLUG USUARIO
      // =========================
      const baseUserSlug = generateSlug(data.name);
      let userSlug = baseUserSlug;
      let userCount = 1;

      while (
        await tx.user.findFirst({
          where: { slug: userSlug, companyId: company.id },
        })
      ) {
        userSlug = `${baseUserSlug}-${userCount++}`;
      }

      // =========================
      // 👤 CREAR USUARIO
      // =========================
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashed,
          role: data.role || "ADMIN",
          slug: userSlug,
          companyId: company.id,
        },
        select: {
          ...userSelect,
          companyId: true,
          company: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      });

      // =========================
      // 🔐 TOKEN
      // =========================
      const token = generateToken({
        id: user.id,
        companyId: user.companyId,
        role: user.role,
      });

      return {
        user,
        token,
        slug: company.slug,
      };
    });

  } catch (error) {
    // 🔥 Manejo de errores únicos (MUY IMPORTANTE)
    if (error.code === 'P2002') {
      throw createError('El correo ya está registrado', 400);
    }

    throw error;
  }
};

// =========================
// 🔐 LOGIN
// =========================
const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError("Email y contraseña requeridos", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      ...userSelect,
      password: true,
      isActive: true,
      isDeleted: true,
      companyId: true,
      role: true,
      company: {
        select: {
          slug: true,
        },
      },
    },
  });

  // ❌ Usuario inexistente o inactivo
  if (!user || !user.isActive || user.isDeleted) {
    throw createError("Credenciales inválidas", 401);
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw createError("Credenciales inválidas", 401);
  }

  // 🔐 TOKEN
  const token = generateToken({
    id: user.id,
    companyId: user.companyId,
    role: user.role,
  });

  // 🔒 Eliminar password del response
  delete user.password;
  delete user.isActive;
  delete user.isDeleted;

  return {
    user,
    token,
    slug: user.company?.slug,
  };
};

module.exports = { register, login };