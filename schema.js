// const Joi = require("joi");

// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     image: Joi.string().allow(null)
//   }).required()
// });

// module.exports = { listingSchema };

// const Joi = require("joi");

// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required().messages({ "any.required": "Title is required" }),
//     description: Joi.string().required().messages({ "any.required": "Description is required" }),
//     location: Joi.string().required().messages({ "any.required": "Location is required" }),
//     price: Joi.number().required().min(0).messages({
//       "number.base": "Price must be a number",
//       "number.min": "Price cannot be negative",
//       "any.required": "Price is required"
//     }),
//     image: Joi.string().allow("", null) // optional field
//   }).required()
// });

// module.exports = { listingSchema };
const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({ "any.required": "Title is required" }),
    description: Joi.string().required().messages({ "any.required": "Description is required" }),
    location: Joi.string().required().messages({ "any.required": "Location is required" }),
    country: Joi.string().required().messages({ "any.required": "Country is required" }), // ✅ Add this line
    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required"
    }),
    image: Joi.string().allow("", null) // optional field
  }).required()
});

module.exports = { listingSchema };
