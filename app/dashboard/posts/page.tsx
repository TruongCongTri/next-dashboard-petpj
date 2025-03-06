import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { postsBreadcrumb } from "@/data/breadcrumb";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { PostDataTable } from "@/components/tables/post-data-table";
import { IPostType } from "@/models/dummyType";
import { postColumns } from "@/components/tables/post-columns";

const fetchPosts = async (): Promise<IPostType[]> => {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
};

export default async function PostsPage() {
  const data = await fetchPosts();

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {postsBreadcrumb.map(
              (o, idx) => idx === postsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={postsBreadcrumb} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            <LogOut style={{ transform: "rotate(270deg)" }} /> Export
          </Button>
          <Button>
            <Link href={`${siteConfig.shop.post}/add`}>
              <Plus /> Add Post
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <PostDataTable columns={postColumns} data={data.posts} />
      </div>
    </div>
  );
}
