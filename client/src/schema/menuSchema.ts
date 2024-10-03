import { z } from "zod";

export const menuSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(0, "Price cannot be negative"),
  image:
    z
      .instanceof(File)
      .optional()
      .refine((file) => file?.size !== 0, "Image file is required") ||
    z.string(),
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
