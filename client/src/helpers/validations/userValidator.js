import Joi from "joi-browser";

const schema = {
  name: Joi.string().required().max(30),
  email: Joi.string().required().email(),
  password: Joi.string().alphanum().min(8).required(),
};

export default function (inputs) {
  const { error } = Joi.validate(inputs, schema, { abortEarly: false });
  if (!error) return null;
  const validationErrors = {};
  error.details.forEach((item) => {
    validationErrors[item.path[0]] = item.message;
  });
  return validationErrors;
}
