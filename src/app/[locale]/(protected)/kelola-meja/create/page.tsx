"use client";

import { useProduct } from "@/components/parts/admin/kelolaMeja/api";
import {
  MejaForm,
  MejaFormSchema,
} from "@/components/parts/admin/kelolaMeja/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
  const router = useRouter();
  const createProductMutation = useProduct("POST");
  const form = useForm<MejaForm>({
    resolver: zodResolver(MejaFormSchema),
    defaultValues: {
      table: "",
      price: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = (data: MejaForm) => {
    // console.log("data", data);
    // createProductMutation.mutate(data, {
    //     onSuccess: (data) => {
    //         router.push("/data-master/category-business");
    //     },
    // });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Produk",
            href: "/manajemen-meja",
          },
          {
            title: "Tambah",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<MejaForm>
                name="table"
                label="Nama Meja"
                placeholder="Masukkan Nama Meja"
              />
              <CustomFormSelect<MejaForm>
                name="type"
                label="Tipe"
                options={[
                  { label: "Meja Besar", value: "mejabesar" },
                  { label: "Meja Kecil", value: "mejakecil" },
                ]}
              />
              <CustomFormInput<MejaForm>
                name="price"
                label="Harga Sewa Meja"
                placeholder="Masukkan Harga Sewa Meja"
                type="number"
              />
              <CustomFormInput<MejaForm>
                name="description"
                label="Deskripsi"
                placeholder="Masukkan Deskripsi Meja"
                type="string"
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Tambah
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductPage;
