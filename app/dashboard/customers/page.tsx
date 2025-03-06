import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { usersBreadcrumb } from "@/data/breadcrumb";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";

import { userColumns } from "@/components/tables/user-columns";
import { UserDataTable } from "@/components/tables/user-data-table";
import { IUserFetch } from "@/models/dummyType";

async function getData(): Promise<IUserFetch> {
  // Fetch data from your API here.
  const res = await fetch("https://dummyjson.com/users");
  return res.json();
}

export default async function ProductsPage() {
  const data = await getData();
  console.log(data);
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {usersBreadcrumb.map(
              (o, idx) => idx === usersBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={usersBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button>
            <Plus /> Add Customer
          </Button>
        </div>
      </div>
      <div>
        <UserDataTable columns={userColumns} data={data.users} />
      </div>
    </div>
  );
}
