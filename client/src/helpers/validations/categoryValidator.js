import Joi from "joi-browser";

const schema = {
  name: Joi.string().required().min(3).max(30),
  color: Joi.string().required(),
};

export default function categoryValidator(inputs) {
  const { error } = Joi.validate(inputs, schema, { abortEarly: false });
  if (!error) return null;
  const validationErrors = {};
  error.details.forEach((item) => {
    validationErrors[item.path[0]] = item.message;
  });
  return validationErrors;
}
