const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const Company = require('../../models/Company');
const auth = require('../../middleware/auth');
const errorHandler = require('../../errorHandler');

const router = express.Router();

const populate = [];

/**
 * @swagger
 * tags:
 *   name: companies
 */

/**
 * @swagger
 * paths:
 *   /companies:
 *     post:
 *       tags:
 *         - companies
 *       operationId: create
 *       summary: Creates a new company.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: userType
 *           schema:
 *             type: string
 *           example: admin
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Shababek
 *               required:
 *                 - name
 *       responses:
 *         201:
 *           description: Company created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Company'
 *         400:
 *           $ref: '#/components/responses/ClientError'
 *         401:
 *           $ref: '#/components/responses/AuthorizationError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */
router.post('/', auth(['admin']), async (req, res) => {
  try {
    switch (req.admin.role) {
      case 'Admin':
      case 'Cashier': {
        const error = new Error();

        error.name = 'AuthorizationError';
        error.message = "You aren't authorized to perform this action.";

        throw error;
      }

      default:
        break;
    }

    const company = new Company(req.body);

    await company.save();

    await Company.populate(company, populate);

    res.status(201).json(company);
  } catch (error) {
    const reformattedError = errorHandler.reformatAndLog(req.admin._id, error);

    res.status(reformattedError.statusCode).json(reformattedError);
  }
});

/**
 * @swagger
 * paths:
 *   /companies:
 *     get:
 *       tags:
 *         - companies
 *       operationId: read
 *       summary: Reads list of companies.
 *       security:
 *        - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: userType
 *           schema:
 *             type: string
 *           example: admin
 *         - in: query
 *           name: fields
 *           schema:
 *             type: string
 *           example: -_id,name
 *         - in: query
 *           name: limit
 *           schema:
 *             type: number
 *           example: 10
 *         - in: query
 *           name: skip
 *           schema:
 *             type: number
 *           example: 20
 *         - in: query
 *           name: sortBy
 *           schema:
 *             type: string
 *           example: createdAt:asc
 *       responses:
 *         200:
 *           description: List of companies returned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Company'
 *         401:
 *           $ref: '#/components/responses/AuthorizationError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const match = {};

    switch (req.admin.role) {
      case 'Admin':
        match._id = { $ne: req.admin.company };
        break;

      case 'Cashier': {
        const error = new Error();

        error.name = 'AuthorizationError';
        error.message = "You aren't authorized to perform this action.";

        throw error;
      }

      default:
        break;
    }

    let fields;

    if (req.query.fields) {
      fields = req.query.fields.replace(/,/g, ' ');
    }

    const sort = {};

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');

      if (parts[1]) {
        switch (parts[1].toLowerCase()) {
          case 'desc':
            sort[parts[0]] = -1;
            break;

          case 'asc':
            sort[parts[0]] = 1;
            break;

          default:
            break;
        }
      }
    } else {
      sort.createdAt = -1;
    }

    const companies = await Company.find(match)
      .select(fields)
      .limit(Number(req.query.limit))
      .skip(Number(req.query.skip))
      .sort(sort)
      .populate(populate);

    res.json(companies);
  } catch (error) {
    const reformattedError = errorHandler.reformatAndLog(req.admin._id, error);

    res.status(reformattedError.statusCode).json(reformattedError);
  }
});

/**
 * @swagger
 * paths:
 *   /companies/{id}:
 *     get:
 *       tags:
 *         - companies
 *       operationId: readById
 *       summary: Reads a company by ID.
 *       security:
 *        - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           example: e05x40a8161m495p500l684e
 *         - in: query
 *           name: userType
 *           schema:
 *             type: string
 *           example: admin
 *         - in: query
 *           name: fields
 *           schema:
 *             type: string
 *           example: -_id,name
 *       responses:
 *         200:
 *           description: Company returned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Company'
 *         401:
 *           $ref: '#/components/responses/AuthorizationError'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */
router.get('/:id', auth(['admin']), async (req, res) => {
  try {
    const error = new Error();

    error.name = 'NotFoundError';
    error.message = "We couldn't find the company you are looking for.";

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw error;
    }

    const match = {};

    switch (req.admin.role) {
      case 'Super Admin':
        match._id = req.params.id;
        break;

      case 'Admin':
        match.$and = [
          {
            _id: req.params.id,
          },
          {
            _id: {
              $ne: req.admin.company,
            },
          },
        ];
        break;

      case 'Cashier':
        error.name = 'AuthorizationError';
        error.message = "You aren't authorized to perform this action.";

        throw error;

      default:
        break;
    }

    let fields;

    if (req.query.fields) {
      fields = req.query.fields.replace(/,/g, ' ');
    }

    const company = await Company.findOne(match).select(fields).populate(populate);

    if (!company) {
      throw error;
    }

    res.json(company);
  } catch (error) {
    const reformattedError = errorHandler.reformatAndLog(req.admin._id, error);

    res.status(reformattedError.statusCode).json(reformattedError);
  }
});

/**
 * @swagger
 * paths:
 *   /companies/{id}:
 *     patch:
 *       tags:
 *         - companies
 *       operationId: updateById
 *       summary: Updates a company by ID.
 *       security:
 *        - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           example: e05x40a8161m495p500l684e
 *         - in: query
 *           name: userType
 *           schema:
 *             type: string
 *           example: admin
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Shababek
 *       responses:
 *         200:
 *           description: Company updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Company'
 *         400:
 *           $ref: '#/components/responses/ClientError'
 *         401:
 *           $ref: '#/components/responses/AuthorizationError'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */
router.patch('/:id', auth(['admin']), async (req, res) => {
  try {
    const error = new Error();

    error.name = 'NotFoundError';
    error.message = "We couldn't find the company you are looking for.";

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw error;
    }

    const updatesKeys = Object.keys(req.body);
    const allowedUpdatesKeys = ['name'];
    const isValidOperation = updatesKeys.every((updatesKey) => allowedUpdatesKeys.includes(updatesKey));

    if (!isValidOperation) {
      error.name = 'ValidationError';
      error.errors = {};

      updatesKeys.forEach((updatesKey) => {
        if (!allowedUpdatesKeys.includes(updatesKey)) {
          error.errors[updatesKey] = { message: `${_.upperFirst(_.lowerCase(updatesKey))} cannot be modified.` };
        }
      });

      throw error;
    }

    const match = {};

    switch (req.admin.role) {
      case 'Super Admin':
        match._id = req.params.id;
        break;

      case 'Admin':
        match.$and = [{ _id: req.params.id }, { _id: { $ne: req.admin.company } }];
        break;

      case 'Cashier':
        error.name = 'AuthorizationError';
        error.message = "You aren't authorized to perform this action.";

        throw error;

      default:
        break;
    }

    const company = await Company.findOne(match);

    if (!company) {
      throw error;
    }

    updatesKeys.forEach((updatesKey) => {
      company[updatesKey] = req.body[updatesKey];
    });

    await company.save();

    await Company.populate(company, populate);

    res.json(company);
  } catch (error) {
    const reformattedError = errorHandler.reformatAndLog(req.admin._id, error);

    res.status(reformattedError.statusCode).json(reformattedError);
  }
});

/**
 * @swagger
 * paths:
 *   /companies/{id}:
 *     delete:
 *       tags:
 *         - companies
 *       operationId: deleteById
 *       summary: Deletes a company by ID.
 *       security:
 *        - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           example: e05x40a8161m495p500l684e
 *         - in: query
 *           name: userType
 *           schema:
 *             type: string
 *           example: admin
 *       responses:
 *         200:
 *           description: Company deleted successfully.
 *         401:
 *           $ref: '#/components/responses/AuthorizationError'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const error = new Error();

    error.name = 'NotFoundError';
    error.message = "We couldn't find the company you are looking for.";

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw error;
    }

    const match = {};

    switch (req.admin.role) {
      case 'Super Admin':
        match._id = req.params.id;
        break;

      case 'Admin':
        match.$and = [{ _id: req.params.id }, { _id: { $ne: req.admin.company } }];
        break;

      case 'Cashier':
        error.name = 'AuthorizationError';
        error.message = "You aren't authorized to perform this action.";
        throw error;

      default:
        break;
    }

    const company = await Company.findOne(match);

    if (!company) {
      throw error;
    }

    await Company.deleteOne(match);

    res.json();
  } catch (error) {
    const reformattedError = errorHandler.reformatAndLog(req.admin._id, error);

    res.status(reformattedError.statusCode).json(reformattedError);
  }
});

module.exports = router;
