import pkg, { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// 🔧 SLUG GENERATOR
const generateSlug = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

// 🔐 HASH PASSWORD
const hashPassword = async (password) =>
  bcrypt.hash(password, 10);

async function main() {
  console.log("🌱 Iniciando seed...\n");

  try {
    // 🏢 COMPANY
    const company = await prisma.company.create({
      data: {
        name: "Distribuidora ABC",
        slug: "distribuidora-abc",
        ruc: "20123456789",
        email: "info@abc.com",
        phone: "01-2345678",
        address: "Av. Principal 1000, Lima",
        subscriptionTier: "PREMIUM",
      },
    });

    // 🏬 BRANCHES
    const branches = await Promise.all([
      prisma.branch.create({
        data: {
          name: "Sucursal Centro",
          slug: "sucursal-centro",
          address: "Centro",
          companyId: company.id,
        },
      }),
      prisma.branch.create({
        data: {
          name: "Sucursal Norte",
          slug: "sucursal-norte",
          address: "Norte",
          companyId: company.id,
        },
      }),
    ]);

    // 📏 UNITS
    const units = await Promise.all([
      prisma.unit.create({
        data: {
          name: "Unidad",
          abbreviation: "UND",
          type: "UNIT",
          conversionFactor: new Prisma.Decimal("1"),
          companyId: company.id,
        },
      }),
    ]);

    // 👤 USERS
    const password = await hashPassword("Password123!");

    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: "Admin",
          email: "admin@abc.com",
          password,
          slug: generateSlug("Admin"),
          role: "ADMIN",
          companyId: company.id,
          branchId: branches[0].id,
        },
      }),
      prisma.user.create({
        data: {
          name: "Vendedor",
          email: "vendedor@abc.com",
          password,
          slug: generateSlug("Vendedor"),
          role: "EMPLOYEE",
          companyId: company.id,
          branchId: branches[0].id,
        },
      }),
    ]);

    // 📁 CATEGORY
    const category = await prisma.category.create({
      data: {
        name: "Bebidas",
        slug: "bebidas",
        companyId: company.id,
      },
    });

    // 🍎 PRODUCTS
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: "Coca Cola",
          slug: "coca-cola",
          purchasePrice: new Prisma.Decimal("2"),
          costPrice: new Prisma.Decimal("2"),
          salePrice: new Prisma.Decimal("3.5"),
          stock: 100,
          companyId: company.id,
          categoryId: category.id,
          unitId: units[0].id,
        },
      }),
    ]);

    // 📦 INVENTORY
    const inventory = await prisma.inventory.create({
      data: {
        stock: 100,
        productId: products[0].id,
        branchId: branches[0].id,
        companyId: company.id,
      },
    });

    // 📊 INVENTORY HISTORY (AJUSTADO A TU SCHEMA)
    await prisma.inventoryHistory.create({
      data: {
        type: "PURCHASE",
        quantity: 100,
        previousStock: 0,
        newStock: 100,
        productId: products[0].id,
        branchId: inventory.id, // ⚠️ tu schema usa mal este campo
        companyId: company.id,
      },
    });

    // 💳 PAYMENT METHODS
    const paymentMethods = await Promise.all([
      prisma.paymentMethod_DB.create({
        data: {
          name: "Efectivo",
          type: "CASH",
          companyId: company.id,
        },
      }),
    ]);

    // 💰 SALE
    const sale = await prisma.sale.create({
      data: {
        saleNumber: "V001",
        subtotal: new Prisma.Decimal("7"),
        tax: new Prisma.Decimal("1.26"),
        total: new Prisma.Decimal("8.26"),
        sellerId: users[1].id,
        branchId: branches[0].id,
        companyId: company.id,

        details: {
          create: [
            {
              productId: products[0].id,
              quantity: 2,
              price: new Prisma.Decimal("3.5"),
              subtotal: new Prisma.Decimal("7"),
            },
          ],
        },

        payments: {
          create: [
            {
              amount: new Prisma.Decimal("8.26"),
              status: "COMPLETED",
              paymentMethod: paymentMethods[0].id, // ✅ FIX
              paidAt: new Date(),
            },
          ],
        },
      },
    });

    // 🔔 NOTIFICATION
    await prisma.notification.create({
      data: {
        title: "Stock bajo",
        message: "Producto bajo",
        type: "LOW_STOCK",
        userId: users[0].id,
        companyId: company.id,
      },
    });

    // 📋 AUDIT
    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entityType: "Sale",
        entityId: sale.id,
        newValues: {
          total: sale.total,
        },
        companyId: company.id,
      },
    });

    // ⚙️ CONFIG
    await prisma.configuration.create({
      data: {
        companyId: company.id,
      },
    });

    console.log("✅ SEED COMPLETADO");
  } catch (error) {
    console.error(error);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });