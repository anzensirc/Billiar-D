import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";

export const transaksiData = [
  {
    id: 1,
    no: 1,
    no_transaksi: "TRX001",
    nama_pemesan: "John Doe",
    tanggal_booking: "2023-10-01",
    tanggal_transaksi: "2023-10-02",
    total_bayar: 150000,
    status_pembayaran: "Lunas",
  },
  {
    id: 2,
    no: 2,
    no_transaksi: "TRX002",
    nama_pemesan: "Azizi",
    tanggal_booking: "2023-10-11",
    tanggal_transaksi: "2023-10-12",
    total_bayar: 150000,
    status_pembayaran: "Belum Lunas",
  },
];

export const transaksiColumns: ColumnDef<ProductResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "meja",
    header: "Meja",
    cell: ({ row }) => row.original.meja,
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) =>
      `Rp${Number(row.original.harga).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "tipe",
    header: "Tipe",
   cell: ({ row }) => row.original.tipe,
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
    cell: ({ row }) => row.original.deskripsi,
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/tables/admin/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`infrastruktur/${row.original.id}/delete`}
            queryKey="useGetSarana"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
