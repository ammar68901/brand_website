import { z } from 'zod';

// Perfume order validation
export const createOrderSchema = z.object({
  perfumeId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(10),
  totalPrice: z.number().positive(),
  customer_name: z.string().min(2).max(100),
  phone: z.string().regex(/^03\d{9}$/, {
    message: "Invalid Pakistani phone number. Must start with 03 and be 11 digits.",
  }),
  address: z.string().min(10).max(500),
  city: z.string().min(2).max(50),
  postalCode: z.string().max(10).optional(),
});