import Joi from "joi-browser";

const schema = {
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().min(10).max(240),
  category: Joi.string().required(),
  creator: Joi.string().min(3).max(30),
};

export default function techValidator(inputs) {
  const { error } = Joi.validate(inputs, schema, { abortEarly: false });
  if (!error) return null;
  const validationErrors = {};
  error.details.forEach((item) => {
    validationErrors[item.path[0]] = item.message;
  });
  return validationErrors;
}
