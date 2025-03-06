"use client";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { IPostType } from "@/models/dummyType";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const postColumns: ColumnDef<IPostType>[] = [
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
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.info.post}/${prod.id}`}>
              <Eye />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.info.post}/${prod.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.info.post}/${prod.id}`}>
              <Trash2 />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
