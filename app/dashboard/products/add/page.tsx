import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { productAddBreadcrumb } from "@/data/breadcrumb";

import ProdForm from "@/components/forms/products/ProdForm";

export default async function AddProductPage() {
  //   const products = await fetchProducts();

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {productAddBreadcrumb.map(
              (o, idx) => idx === productAddBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={productAddBreadcrumb} />
        </div>
      </div>
      <div>
        <ProdForm />
      </div>
    </div>
  );
}
