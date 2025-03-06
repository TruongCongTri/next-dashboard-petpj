"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  query: string[];
}

export function DataTableSearch<TData>({
  table,
  query,
}: DataTableViewOptionsProps<TData>) {
  return (
    <Input
      placeholder="Filter emails..."
      value={
        query.map((o) => table.getColumn(o)?.getFilterValue() as string) ?? ""
      }
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}

// (table.getColumn("email")?.getFilterValue() as string) ?? ""
