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
import { CartArr, IUserType } from "@/models/dummyType";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
function GetOrders(user: IUserType) {
  const [carts, setCarts] = useState<CartArr>();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://dummyjson.com/carts/user/${user.id}`);
      const data = await res.json();
      setCarts(data);
    }
    fetchPosts();
  }, [user]);

  if (!carts) return <div>Loading...</div>;
  return <div>{carts.total}</div>;
}
export const userColumns: ColumnDef<IUserType>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image} alt={user.username} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.username}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "orders",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Orders" />;
    },
    cell: ({ row }) => GetOrders(row.original),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("balance"));
      const amount = parseFloat('121')
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const s = row.getValue("status");

      return (
        <>
          {`${s}` === "Draft" ? (
            <Badge className="bg-gray-100 text-gray-500 rounded-full hover:bg-gray-100">{`${s}`}</Badge>
          ) : `${s}` === "Active" ? (
            <Badge className="bg-emerald-100 text-emerald-500 rounded-full hover:bg-emerald-100">{`${s}`}</Badge>
          ) : (
            `${s}` === "Blocked" && (
              <Badge className="bg-red-100 text-red-500 rounded-full hover:bg-red-100">{`${s}`}</Badge>
            )
          )}
        </>
      );
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: () => {
      const date = new Date();
      return <div>{date.toDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.customer}/${user.id}`}>
              <Eye />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.customer}/${user.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.customer}/${user.id}`}>
              <Trash2 />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
