// A tiny wrapper to use Joi schemas
module.exports = schema => (req, res, next) => {
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const details = result.error.details.map(d => d.message);
    return res.status(400).json({ message: "Validation error", details });
  }
  next();
};
