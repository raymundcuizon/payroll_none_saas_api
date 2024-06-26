import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  AWS_COGNITO_USERPOOL_ID: Joi.string().required(),
  AWS_COGNITO_CLIENTID: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_accessKeyId: Joi.string().required(),
  AWS_secretAccessKey: Joi.string().required(),
});
