"use client";
import Link from "next/link";

import { siteConfig } from "@/data/site";
import { ICategoryType } from "@/models/dummyType";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Eye, Pencil, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
function randomDate() {
  return new Date(new Date().valueOf() - Math.random() * 1e12);
}

export const cateColumns: ColumnDef<ICategoryType>[] = [
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
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="/" alt={category.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{category.name}</span>
            <span className="truncate text-xs">{category.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sale",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: () => {
      return <div>{getRandomInt(4000)}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: () => {
      return <div>{getRandomInt(200)}</div>;
    },
  },
  {
    accessorKey: "added",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Added" />
    ),
    cell: () => {
      return <div>{randomDate().toString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.category}/${category.slug}`}>
              <Eye />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.category}/${category.slug}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.category}/${category.slug}`}>
              <Trash2 />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
