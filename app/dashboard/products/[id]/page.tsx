import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import {
  postDetailsBreadcrumb,
  productDetailsBreadcrumb,
} from "@/data/breadcrumb";

import ViewProdForm from "@/components/forms/products/ViewProdForm";

export default async function ProductDetailsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {postDetailsBreadcrumb.map(
              (o, idx) => idx === productDetailsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={productDetailsBreadcrumb} />
        </div>
      </div>
      <div>
        <ViewProdForm />
      </div>
    </div>
  );
}
