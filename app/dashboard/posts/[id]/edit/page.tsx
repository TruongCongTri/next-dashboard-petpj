import React from "react";

import { BreadcrumbLayout } from "@/components/layouts/breadcrumb";
import { postEditBreadcrumb } from "@/data/breadcrumb";

import EditPostForm from "@/components/forms/posts/EditPostForm";

export default async function EditPostPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <div>
            {postEditBreadcrumb.map(
              (o, idx) => idx === postEditBreadcrumb.length - 1 && o.name
            )}
          </div>
          <BreadcrumbLayout items={postEditBreadcrumb} />
        </div>
      </div>
      <div>
        <EditPostForm />
      </div>
    </div>
  );
}
