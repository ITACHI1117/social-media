import { z } from "zod/v4";

// Registration schema
export const registrationSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  password: z.string().min(8, "Password must contain 8 characters"),
  matricNumber: z.number().min(9, "Matric Number must be 9 digits"),
  email: z.email(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must contain 8 characters"),
});
