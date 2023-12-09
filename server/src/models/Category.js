const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         company:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         name:
 *           type: string
 *           example: Cold Drinks
 *         description:
 *           type: string
 *           example: Cool drinks
 *         isActive:
 *           type: boolean
 *           default: true
 *           example: true
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
 *         - company
 *         - name
 *         - description
 *         - isActive
 */
const CategorySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'A company ID must be attached to the Category.'],
    },
    name: {
      type: String,
      required: [true, "Name can't be blank."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description can't be blank."],
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: [true, "Active status can't be blank."],
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
