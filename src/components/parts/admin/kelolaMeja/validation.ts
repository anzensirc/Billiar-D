import { z } from "zod";

export const MejaFormSchema = z.object({
  table: z.string().min(1, { message: "Nama produk wajib diisi" }),
  type: z.string().min(1, { message: "Kategori wajib diisi" }),
  price: z.string().min(1, { message: "Harga produk wajib diisi" }),
  description: z.string().min(1, { message: "Stok produk wajib diisi" }),
});

export type MejaForm = z.infer<typeof MejaFormSchema>;
