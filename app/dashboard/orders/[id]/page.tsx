import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { orderDetailsBreadcrumb } from "@/data/breadcrumb";

import OrderForm from "@/components/forms/orders/OrderForm";

export default async function OrderDetailsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {orderDetailsBreadcrumb.map(
              (o, idx) => idx === orderDetailsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={orderDetailsBreadcrumb} />
        </div>
      </div>
      <div className="w-full flex gap-6">
        <OrderForm />
      </div>
    </div>
  );
}
