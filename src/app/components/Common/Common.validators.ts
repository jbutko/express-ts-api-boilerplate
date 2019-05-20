import * as Joi from 'joi';

export const PostDisplayNameSchema = Joi.object({
  name: Joi.string().required(),
});
