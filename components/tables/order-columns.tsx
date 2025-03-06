"use client";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/common-table-header";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Eye, Pencil } from "lucide-react";
import { ICartType, IUserType } from "@/models/dummyType";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function GetUser(userId: number) {
  const [user, getUser] = useState<IUserType>();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await res.json();
      getUser(data);
    }
    fetchPosts();
  }, [userId]);

  if (!user)
    return (
      <div>
        <div>Loading...</div>
        <div>Loading...</div>
      </div>
    );
  return (
    <div>
      <div>{user.username}</div>
      <div>{user.email}</div>
    </div>
  );
}

export const orderColumns: ColumnDef<ICartType>[] = [
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
    accessorKey: "order",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;
      return <div className="text-primary"># {`${order.id}`}</div>;
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const order = row.original;

      return (
        <>
          {order.products.map(
            (o, idx) =>
              idx === 0 && (
                <div key={idx} className="flex gap-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={o.thumbnail} alt={o.title} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{o.title}</span>
                    {order.products.length >= 2 && (
                      <span className="truncate text-xs">
                        + {order.products.length - 1} other products
                      </span>
                    )}
                  </div>
                </div>
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
      const createdDate = new Date();
      return <div>{createdDate.toDateString()}</div>;
    },
    // filterFn: (row, id, value) => {
    //   const createdDate = new Date(row.getValue("created"));
    //   const filter_from = value.from;
    //   const filter_to = value.to;

    //   if (
    //     isSameDay(filter_from, createdDate) ||
    //     isSameDay(filter_to, createdDate)
    //   ) {
    //     return true;
    //   }
    //   return false;
    // },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => GetUser(row.original.userId),
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
  {
    accessorKey: "payment",
    header: "Payment",
    cell: () => <div>MasterCard</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: () => {
      // const s = row.getValue("status");
      // const order = row.original;
      const status = "Draft";
      return (
        <>
          {`${status}` === "Draft" ? (
            <Badge className="bg-gray-100 text-gray-500 rounded-full hover:bg-gray-100">{`${status}`}</Badge>
          ) : `${status}` === "Delivered" ? (
            <Badge className="bg-emerald-100 text-emerald-500 rounded-full hover:bg-emerald-100">{`${status}`}</Badge>
          ) : `${status}` === "Processing" ? (
            <Badge className="bg-orange-100 text-orange-500 rounded-full hover:bg-orange-100">{`${status}`}</Badge>
          ) : `${status}` === "Shipped" ? (
            <Badge className="bg-blue-100 text-blue-500 rounded-full hover:bg-blue-100">{`${status}`}</Badge>
          ) : (
            `${status}` === "Cancelled" && (
              <Badge className="bg-red-100 text-red-500 rounded-full hover:bg-red-100">{`${status}`}</Badge>
            )
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.order}/${order.id}`}>
              <Eye />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`${siteConfig.shop.order}/${order.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
