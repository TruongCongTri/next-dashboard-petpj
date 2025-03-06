import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { postAddBreadcrumb } from "@/data/breadcrumb";
import PostForm from "@/components/forms/posts/PostForm";

export default async function AddPostPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {postAddBreadcrumb.map(
              (o, idx) => idx === postAddBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={postAddBreadcrumb} />
        </div>
      </div>
      <div>
        <PostForm />
      </div>
    </div>
  );
}
