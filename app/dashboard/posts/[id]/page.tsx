import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { postDetailsBreadcrumb } from "@/data/breadcrumb";

import ViewPostForm from "@/components/forms/posts/ViewPostForm";

export default async function PostDetailsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {postDetailsBreadcrumb.map(
              (o, idx) => idx === postDetailsBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={postDetailsBreadcrumb} />
        </div>
      </div>
      <div>
        <ViewPostForm />
      </div>
    </div>
  );
}
