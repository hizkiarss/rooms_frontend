import { TransactionsType } from "@/types/transactions/TransactionsType";
import { FilterFn } from "@tanstack/react-table";

export const TransactionFilter: FilterFn<TransactionsType> = (
  row,
  columnId,
  filterValue,
  addMeta
) => {
  const searchableColumns = [
    "firstName",
    "lastName",
    "email",
    "status",
    "paymentMethod",
    "mobileNumber",
  ];
  if (!filterValue) return true;
  return searchableColumns.some((column) => {
    const cellValue = row.getValue(column);
    return cellValue
      ? String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      : false;
  });
};
