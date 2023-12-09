const mongoose = require('mongoose');
const path = require('path');

const logger = require('./logger');

module.exports.connect = async () => {
  try {
    mongoose.set('strictQuery', false);

    mongoose.connect(process.env.MONGODB_URI);

    logger.info(`[${path.relative(process.cwd(), __filename)}] Database connected.`);
  } catch (error) {
    logger.error(error.stack);
  }
};

module.exports.close = async () => {
  try {
    await mongoose.connection.close();

    logger.info(`[${path.relative(process.cwd(), __filename)}] Database connection closed.`);
  } catch (error) {
    logger.error(error.stack);
  }
};

module.exports.seed = async (isClean = false, outSideIterations = 5, inSideIterations = 5) => {
  const Admin = require('./models/Admin');
  const Category = require('./models/Category');
  const Company = require('./models/Company');
  const Order = require('./models/Order');
  const Product = require('./models/Product');
  const Table = require('./models/Table');
  const errorHandler = require('./errorHandler');

  if (process.env.NODE_ENV === 'production') {
    try {
      if (await Admin.findOne({})) {
        return;
      }

      let company = await Company.findOne({ name: 'iPOSDahab' });

      if (!company) {
        company = new Company({ name: 'iPOSDahab' });
      }

      await company.save();

      const admin = new Admin({
        company: company._id,
        role: 'Super Admin',
        firstName: 'Youssef',
        lastName: 'Al Shazly',
        phoneNumber: '01006044452',
        email: 'y.alshazly@outlook.com',
        password: '12345678',
      });

      await admin.save();

      logger.info(`[${path.relative(process.cwd(), __filename)} ${admin.email}] Admin added successfully].`);
    } catch (error) {
      errorHandler.reformatAndLog(undefined, error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    const { faker } = require('@faker-js/faker'); // eslint-disable-line

    const seedAdmin = async (parent, company, role, email) => {
      try {
        const { person, phone } = faker;

        const admin = new Admin({
          company: company._id,
          firstName: person.firstName(),
          lastName: person.lastName(),
          phoneNumber: phone.number(),
          email,
          password: 'iposdahab',
          role,
        });

        await admin.save();

        logger.info(
          `[${path.relative(process.cwd(), __filename)}, ${parent?._id}] Admin [${
            admin.email
          }] added successfully by admin [${parent?.email}].`,
        );

        return admin;
      } catch (error) {
        errorHandler.reformatAndLog(parent?._id, error);

        throw error;
      }
    };

    const seedCategory = async (company) => {
      const { lorem, commerce } = faker;

      try {
        const category = new Category({ company, name: commerce.productMaterial(), description: lorem.text() });

        await category.save();

        logger.info(
          `[${path.relative(process.cwd(), __filename)}] Category added successfully to company [${company.name}].`,
        );

        return category;
      } catch (error) {
        errorHandler.reformatAndLog(undefined, error);

        throw error;
      }
    };

    const seedCompany = async (name) => {
      try {
        const { company: fakerCompany } = faker;

        const company = new Company({ name: name || fakerCompany.name() });

        await company.save();

        logger.info(`[${path.relative(process.cwd(), __filename)}, ${company._id}] Company.`);

        return company;
      } catch (error) {
        errorHandler.reformatAndLog(undefined, error);

        throw error;
      }
    };

    const seedOrder = async (company, admin, table, products) => {
      try {
        const status = ['Ordered', 'Paid', 'Cancelled', 'Refunded'][Math.floor(Math.random() * (3 - 0 + 1) + 0)];

        const order = new Order({
          company: company._id,
          admin,
          table,
          status,
          paymentType: ['Mixed', 'Cash', 'Card'][Math.floor(Math.random() * (2 - 0 + 1) + 0)],
          service: ['', '14', '18'][Math.floor(Math.random() * (2 - 0 + 1) + 0)],
          taxes: ['8', '14', '16'][Math.floor(Math.random() * (2 - 0 + 1) + 0)],
          discount: ['', '5', '10'][Math.floor(Math.random() * (2 - 0 + 1) + 0)],
          products,
        });

        await order.save();

        logger.info(
          `[${path.relative(process.cwd(), __filename)}, ${admin._id}] order [${
            order.name
          }] added successfully by admin [${admin.email}].`,
        );

        return order;
      } catch (error) {
        errorHandler.reformatAndLog(admin._id, error);

        throw error;
      }
    };

    const seedProduct = async (company, category) => {
      try {
        const { commerce, lorem } = faker;

        const product = new Product({
          company: company._id,
          category,
          name: commerce.product(),
          description: lorem.text(),
          price: commerce.price(),
          imageUrl: 'https://loremflickr.com/640/480/food',
          isActive: [true, false][Math.floor(Math.random() * (1 - 0 + 1) + 0)],
        });

        await product.save();

        logger.info(
          `[${path.relative(process.cwd(), __filename)}, ${company._id}] product [${
            product.name
          }] added successfully to company [${company.name}].`,
        );

        return product;
      } catch (error) {
        errorHandler.reformatAndLog(company._id, error);

        throw error;
      }
    };

    const seedTable = async (company) => {
      try {
        const { lorem } = faker;

        const table = new Table({
          company: company._id,
          name: lorem.word(),
        });

        await table.save();

        logger.info(
          `[${path.relative(process.cwd(), __filename)}, ${company._id}] table [${
            table.name
          }] added successfully to company [${company.name}].`,
        );

        return table;
      } catch (error) {
        errorHandler.reformatAndLog(company._id, error);

        throw error;
      }
    };

    try {
      if (isClean) {
        await mongoose.connection.dropDatabase();

        logger.info(`[${path.relative(process.cwd(), __filename)}] Database wiped successfully.`);
      }

      if (await Admin.findOne({})) {
        return;
      }

      const iposdahabCompany = await seedCompany('ipos Dahab');
      const superAdmin = await seedAdmin(undefined, iposdahabCompany, 'Super Admin', 'superadmin@iposdahab.com');

      logger.info(`[${path.relative(process.cwd(), __filename)}] Admin [${superAdmin.email}] added successfully.`);

      await Promise.allSettled(
        [...Array(outSideIterations).keys()].map(async (item, index) => {
          const company = await seedCompany();

          const admin = await seedAdmin(undefined, company, 'Admin', `admin${index + 1}@iposdahab.com`);
          const Cashier = await seedAdmin(superAdmin, company, 'Cashier', `Cashier${index + 1}@iposdahab.com`);

          await Promise.allSettled(
            [...Array(inSideIterations).keys()].map(async () => {
              const table = await seedTable(company);
              const category = await seedCategory(company);
              const product = await seedProduct(company, category);

              await seedOrder(company, admin, table, [{ product: product._id, price: product.price, count: 2 }]);
              await seedOrder(company, Cashier, table, [{ product: product._id, price: product.price, count: 2 }]);
            }),
          );
        }),
      );

      logger.info(`[${path.relative(process.cwd(), __filename)}] Database seeded successfully.`);
    } catch (error) {
      errorHandler.reformatAndLog(undefined, error);
    }
  }
};
