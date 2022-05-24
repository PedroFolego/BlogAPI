const Joi = require('joi');

const schemaPostCreate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()),
});

const schemaPostUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  schemaPostCreate,
  schemaPostUpdate,
};