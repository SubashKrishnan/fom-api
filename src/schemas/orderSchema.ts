import Joi from 'joi';

export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  locationName: Joi.string().required(),
  status: Joi.string().valid('NEW', 'PREPARING', 'COMPLETED').default('NEW'),
  items: Joi.array()
    .items(
      Joi.object({
        itemId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
});
