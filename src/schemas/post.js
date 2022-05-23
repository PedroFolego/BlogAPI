const Joi = require('joi');

const schemaPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()),
});

module.exports = schemaPost;