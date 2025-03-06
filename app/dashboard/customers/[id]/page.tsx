import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { userDetailsBreadcrumb } from "@/data/breadcrumb";

import ViewUserForm from "@/components/forms/users/ViewUserForm";
import { TransactionDataTable } from "@/components/tables/transaction-data-table";
import { transactionColumns } from "@/components/tables/transaction-columns";
import apis from "@/apis";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Wallet,
  ShoppingCart,
  CircleCheckBig,
  LogOut,
  Pen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site";
export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await apis.customers.getCartsByUser(id);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {userDetailsBreadcrumb.map(
              (o, idx) => idx === userDetailsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={userDetailsBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button asChild>
            <Link href={`${siteConfig.shop.customer}/${id}/edit`}>
              <Pen /> Edit Customer
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-6 space-y-6">
        <div className="basis-full lg:basis-1/4 ">
          <ViewUserForm />
        </div>
        <div className="basis-full lg:basis-3/4 space-y-6">
          <div className="flex justify-between gap-6">
            <Card className="w-full h-full">
              <CardHeader>
                <div className="p-1 bg-green-200 border-4 border-green-100 text-green-500 rounded-full size-10">
                  <Wallet className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div>Total Balance</div>
                <div className="flex items-center gap-1">
                  $723.00{" "}
                  <Badge variant="decrease" className="rounded-full">
                    -25%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full h-full">
              <CardHeader>
                <div className="p-1 bg-orange-200 border-4 border-orange-100 rounded-full text-orange-500 size-10">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div>Total Orders</div>
                <div className="flex items-center gap-1">
                  10
                  <Badge variant="increase" className="rounded-full">
                    +10%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full h-full">
              <CardHeader>
                <div className="p-1 bg-primary/20 border-4 border-primary/10 text-primary rounded-full size-10">
                  <CircleCheckBig className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div>Rewards Point</div>
                <div className="flex items-center gap-1">
                  1400
                  <Badge variant="increase" className="rounded-full">
                    +10%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <TransactionDataTable
            columns={transactionColumns}
            data={data.carts}
          />
        </div>
      </div>
    </div>
  );
}
