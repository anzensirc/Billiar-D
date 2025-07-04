// app/products/page.tsx atau sesuai path-mu
"use client";

import { mejaColumns, mejaData } from "@/components/parts/admin/manajemen-meja/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { useState } from "react";

export default function MejaManajemenPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = mejaData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = mejaData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Produk",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Produk" link="/manajemen-meja/create" />
      </div>
      <DataTable
        columns={mejaColumns}
        data={paginatedData}
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
