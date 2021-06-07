import Joi from "joi-browser";

const schema = {
  name: Joi.string().required().min(3).max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
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
