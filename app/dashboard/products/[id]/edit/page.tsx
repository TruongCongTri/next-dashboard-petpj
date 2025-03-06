import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { productEditBreadcrumb } from "@/data/breadcrumb";

import EditProdForm from "@/components/forms/products/EditProdForm";

export default async function EditProductPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {productEditBreadcrumb.map(
              (o, idx) => idx === productEditBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={productEditBreadcrumb} />
        </div>
      </div>
      <div>
        <EditProdForm />
      </div>
    </div>
  );
}
