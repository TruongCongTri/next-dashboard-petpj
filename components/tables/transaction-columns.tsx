"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { ICartType } from "@/models/dummyType";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const transactionColumns: ColumnDef<ICartType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const cart = row.original;

      return <div className="max-w-[250px] flex gap-2">#{cart.id}</div>;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const cart = row.original;
      const prods = cart.products;
      return (
        <div className="max-w-[250px] flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={prods[0].thumbnail} alt={prods[0].thumbnail} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{prods[0].title}</span>
            <span className="truncate text-xs">
              +{cart.totalQuantity - 1} other products
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "availabilityStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const s = "Delivered";

      return (
        <>
          {`${s}` === "Shipped" ? (
            <Badge className="bg-blue-100 text-blue-500 rounded-full hover:bg-blue-100">{`${s}`}</Badge>
          ) : `${s}` === "Delivered" ? (
            <Badge className="bg-emerald-100 text-emerald-500 rounded-full hover:bg-emerald-100">{`${s}`}</Badge>
          ) : `${s}` === "Processing" ? (
            <Badge className="bg-orange-100 text-orange-500 rounded-full hover:bg-orange-100">{`${s}`}</Badge>
          ) : (
            `${s}` === "Out of Stock" && (
              <Badge className="bg-red-100 text-red-500 rounded-full hover:bg-red-100">{`${s}`}</Badge>
            )
          )}
        </>
      );
    },
  },
  {
    accessorKey: "meta.createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Added" />
    ),
    cell: ({ row }) => {
      const date = new Date();

      return <div>{date}</div>;
    },
  },
];
