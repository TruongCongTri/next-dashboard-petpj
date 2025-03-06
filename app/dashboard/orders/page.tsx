import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { ordersBreadcrumb } from "@/data/breadcrumb";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";

import { ICartType } from "@/models/dummyType";
import { OrderDataTable } from "@/components/tables/order-data-table";
import { orderColumns } from "@/components/tables/order-columns";

async function getData(): Promise<ICartType[]> {
  // Fetch data from your API here.
  const res = await fetch("https://dummyjson.com/carts");
  return res.json();
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {ordersBreadcrumb.map(
              (o, idx) => idx === ordersBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={ordersBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button>
            <Plus /> Add Order
          </Button>
        </div>
      </div>
      <div>
        <OrderDataTable columns={orderColumns} data={data.carts} />
      </div>
    </div>
  );
}
