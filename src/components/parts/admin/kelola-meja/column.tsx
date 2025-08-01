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

export const mejaData = [
  {
    id: 1,
    meja: "Meja Kecil 1",
    harga: 120102,
    tipe: "Meja Kecil",
    deskripsi: "Meja kecil pertama",
  },
  {
    id: 1,
    meja: "Meja Besar",
    harga: 300000,
    tipe: "Meja Besar",
    deskripsi: "Apa ajalah asal ada deskripsi",
  },
  {
    id: 3,
    meja: "Meja Kecil 3",
    harga: 120102,
    tipe: "Meja Kecil",
    deskripsi: "Meja kecil no 3 di dekat kasir",
  },
];

export const mejaColumns: ColumnDef<ProductResponse>[] = [
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
    accessorKey: "aksi",
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
