const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).min(5);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCateorySchema = Joi.object({
  name: name,
  img: image
});

const getUpdateSchema = Joi.object({
  id: id.required()
});

module.exports = { createCategorySchema, updateCateorySchema, getUpdateSchema }
