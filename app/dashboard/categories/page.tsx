import React from "react";
import Link from "next/link";

import { categoriesBreadcrumb } from "@/data/breadcrumb";
import { siteConfig } from "@/data/site";
import { ICategoryType } from "@/models/dummyType";

import { Button } from "@/components/ui/button";
import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";

import { cateColumns } from "@/components/tables/cate-columns";
import { CateDataTable } from "@/components/tables/cate-data-table";

import { LogOut, Plus } from "lucide-react";

const fetchCategories = async (): Promise<ICategoryType[]> => {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
};

export default async function CategoriesPage() {
  const categories = await fetchCategories();
  // const data = await getData();
  console.log(categories);
  
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {categoriesBreadcrumb.map(
              (o, idx) => idx === categoriesBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={categoriesBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button>
            <Link
              href={`${siteConfig.shop.category}/add`}
              className="flex gap-1"
            >
              <Plus /> Add Category
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <CateDataTable columns={cateColumns} data={categories} />
      </div>
    </div>
  );
}
