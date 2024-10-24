import * as Joi from 'joi'


// Si las variables de entorno no vienen, las crea con los
// valores por defecto que están en el schema
export const JoiValidationSchema = Joi.object({
  MONGODB_URI: Joi.required(),
  PORT: Joi.number().default(3002),
  DEFAULT_LIMIT: Joi.number().default(10)
})