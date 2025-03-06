"use client";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { IProductType } from "@/models/dummyType";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const prodColumns: ColumnDef<IProductType>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <div className="max-w-[250px] flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={prod.images[0]} alt={prod.thumbnail} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{prod.title}</span>
            <span className="truncate text-xs">{prod.description}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
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
      const s = row.getValue("availabilityStatus");

      return (
        <>
          {`${s}` === "Draft" ? (
            <Badge className="bg-gray-100 text-gray-500 rounded-full hover:bg-gray-100">{`${s}`}</Badge>
          ) : `${s}` === "In Stock" ? (
            <Badge className="bg-emerald-100 text-emerald-500 rounded-full hover:bg-emerald-100">{`${s}`}</Badge>
          ) : `${s}` === "Low Stock" ? (
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.product}/${prod.id}`}>
              <Eye />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.product}/${prod.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.product}/${prod.id}`}>
              <Trash2 />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
