const mongoose = require('mongoose');

const Admin = require('./Admin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         name:
 *           type: string
 *           example: Shababek
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2019-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2019-01-01T00:00:00.000Z
 *         __v:
 *           type: integer
 *           format: int32
 *           example: 0
 *       required:
 *         - _id
 *         - name
 */
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name can't be blank."],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

companySchema.pre('remove', async function (next) {
  const company = this;

  await Admin.deleteMany({ company: company._id });

  next();
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
