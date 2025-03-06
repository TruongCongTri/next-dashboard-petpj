import React from "react";

import { productsBreadcrumb } from "@/data/breadcrumb";

import { Button } from "@/components/ui/button";
import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";

import { ProdDataTable } from "@/components/tables/prod-data-table";
import { prodColumns } from "@/components/tables/prod-columns";

import { LogOut, Plus } from "lucide-react";
import apis from "@/apis";
import Link from "next/link";
import { siteConfig } from "@/data/site";

// const fetchProducts = async (): Promise<IProductType[]> => {
//   const res = await fetch("https://dummyjson.com/products");
//   return res.json();
// };

export default async function ProductsPage() {
  // const products = await fetchProducts();
  // console.log(products.products);
  const data = await apis.products.getAllProducts();
  console.log(data.products);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {productsBreadcrumb.map(
              (o, idx) => idx === productsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={productsBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button>
            <Link
              href={`${siteConfig.shop.product}/add`}
              className="flex items-center gap-1"
            >
              <Plus /> Add Product
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <ProdDataTable columns={prodColumns} data={data.products} />
      </div>
    </div>
  );
}
