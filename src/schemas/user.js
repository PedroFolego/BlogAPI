const Joi = require('joi');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

module.exports = schemaUser;