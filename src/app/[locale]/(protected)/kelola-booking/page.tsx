"use client";

import { useProduct } from "@/components/parts/admin/kelolaMeja/api";
import { BookingFormPayload, BookingFormSchema } from "@/components/parts/admin/kelolaBooking/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateProductPage = () => {
  const router = useRouter();
  const createProductMutation = useProduct("POST");
  const form = useForm<BookingFormPayload>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      datebooking: "",
      datetransaction: "",
      totalpayment: 0,
      status: "",
      table: "",
      price: 0,
      type: "",
      description: "",
    },
  });

  const onSubmit = (data: BookingFormPayload) => {
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
              <CustomFormInput<BookingFormPayload>
                name="table"
                label="Nama Meja"
                placeholder="Masukkan Nama Meja"
              />
              <CustomFormInput<BookingFormPayload>
                name="name"
                label="Nama Pemesan"
                placeholder="Masukkan Nama Pemesan"
              />
              <CustomFormInput<BookingFormPayload>
                name="phone"
                label="No HP"
                placeholder="Masukkan No Hp"
                type="string"
              />
              <CustomFormSelect<BookingFormPayload>
                name="type"
                label="Tipe"
                options={[
                  { label: "Meja Besar", value: "mejabesar" },
                  { label: "Meja Kecil", value: "mejakecil" },
                ]}
              />
              <CustomFormInput<BookingFormPayload>
                name="price"
                label="Harga Pesanan"
                placeholder="Masukkan Harga Pesanan"
                type="number"
              />
              <CustomFormInput<BookingFormPayload>
                name="description"
                label="Deskripsi"
                placeholder="Masukkan Deskripsi Meja"
                type="string"
              />
              <CustomFormInput<BookingFormPayload>
                name="datetransaction"
                label="Tanggal Transaksi"
                placeholder="Masukkan Tanggal Transaksi"
                type="date"
              />
              <CustomFormInput<BookingFormPayload>
                name="datebooking"
                label="Tanggal Booking"
                placeholder="Masukkan Tanggal Booking"
                type="date"
                />
                <CustomFormInput<BookingFormPayload>
                name="status"
                label="Status Booking"
                placeholder="Masukkan Status Booking"
                type="string"
              />
              <CustomFormInput<BookingFormPayload>
                name="totalpayment"
                label="Total Bayar"
                placeholder="Masukkan Total Bayar"
                type="number"
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