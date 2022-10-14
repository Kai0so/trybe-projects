import { z } from 'zod';

const MotorcycleZodSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).gte(1900).lte(2022),

  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must be 3 or more characters long' }),

  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).min(3, { message: 'buyValue must be 3 or more characters long' }),

  category: z.enum(['Street', 'Custom', 'Trail']),

  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).lte(2500, { message: 'engineCapacity cannot be greater than 2500' }).positive(),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export default IMotorcycle;
export { MotorcycleZodSchema };