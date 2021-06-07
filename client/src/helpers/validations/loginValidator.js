import Joi from "joi-browser";

const schema = {
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
};

export default function userValidator(inputs) {
  const { error } = Joi.validate(inputs, schema, { abortEarly: false });

  if (!error) return null;
  const validationErrors = {};
  error.details.forEach((item) => {
    validationErrors[item.path[0]] = item.message;
  });
  return validationErrors;
}
