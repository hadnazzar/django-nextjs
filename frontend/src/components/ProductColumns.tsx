import { type ColumnDef } from "@tanstack/react-table";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { type UseMutateFunction } from "@tanstack/react-query";
import { Button } from "src/components/ui/button";
import { type Product } from "src/types/products";
import { cx } from "class-variance-authority";

type ColumnConfigFunc = (
  onProductSelect?: UseMutateFunction<void, unknown, Product, unknown>
) => ColumnDef<Product>[];

export const getColumns: ColumnConfigFunc = (onProductSelect) => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={cx("bg-slate-100", {
            "bg-slate-200": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ChevronUpDownIcon className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 text-left capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={cx("bg-slate-100", {
            "bg-slate-200": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronUpDownIcon className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={cx("bg-slate-100", {
            "bg-slate-200": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ChevronUpDownIcon className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className={cx("bg-slate-100", {
          "bg-slate-200": column.getIsSorted(),
        })}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ChevronUpDownIcon className="ml-2 h-5 w-5" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the amount as a dollar price.
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const selected = product.selected;

      return (
        <Button
          variant={selected ? "default" : "outline"}
          className="w-24 rounded-full"
          onClick={() => {
            if (onProductSelect) {
              onProductSelect(product);
            }
          }}
          aria-label="Select product"
        >
          {selected ? "Selected" : "Select"}
        </Button>
      );
    },
  },
];
