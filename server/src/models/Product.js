const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         company:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         category:
 *           type: string
 *           example: e05x40a8161m495p500l684e
 *         name:
 *           type: string
 *           example: pepsi
 *         description:
 *           type: string
 *           example: original pepsi taste
 *         price:
 *           type: string
 *           example: '6'
 *         imageUrl:
 *           type: string
 *           example: http://localhost:5001/.../pepsi.jpg
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
 *         - category
 *         - name
 *         - description
 *         - price
 *         - isActive
 */
const ProductSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'A company ID must be attached to the Product.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'A category ID must be attached to the product.'],
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
    price: {
      type: String,
      required: [true, "Price can't be blank."],
      trim: true,
    },
    imageUrl: String,
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

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
