import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IBreadcrumbType } from "@/models/type";

export function BreadcrumbLayout({
  items,
}: {
  items: IBreadcrumbType[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((o, idx) => (
          <div key={idx}>
            {idx !== items.length - 1 ? (
              <div className="flex items-center gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={o.href}>{o.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink>{o.name}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </div>
        ))}
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
