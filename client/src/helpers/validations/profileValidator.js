import Joi from "joi-browser";

const schema = {
  bio: Joi.string().min(10).max(500),
  skills: Joi.array().items(Joi.string()),
  role: Joi.string().min(3),
  githubusername: Joi.string(),
  youtube: Joi.string().min(3),
  twitter: Joi.string().min(3),
  linkedin: Joi.string().min(3),
};

export default function profileValidator(inputs) {
  const { error } = Joi.validate(inputs, schema, { abortEarly: false });
  if (!error) return null;
  const validationErrors = {};
  error.details.forEach((item) => {
    validationErrors[item.path[0]] = item.message;
  });
  return validationErrors;
}
