"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IProdCartType, IProductType } from "@/models/dummyType";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
function GetProd(prodId: number) {
  const [prod, geProd] = useState<IProductType>();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://dummyjson.com/products/${prodId}`);
      const data = await res.json();
      geProd(data);
    }
    fetchPosts();
  }, [prodId]);

  return prod;
}
export const orderColumns: ColumnDef<IProdCartType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={prod.thumbnail} alt={prod.title} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{prod.title}</span>
            <span>Black</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => {
      const prod = row.original;
      const prodData = GetProd(prod.id);
      return <div>{prodData?.sku}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "QTY",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      // const amount = parseFloat("121");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      // const amount = parseFloat("121");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
];
