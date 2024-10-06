import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SortAndFilterProps {
  sort: string | null;
  status: string | null;
  onSortChange: (value: string | null) => void;
  onStatusChange: (value: string | null) => void;
}

const SortAndFilter: React.FC<SortAndFilterProps> = ({
  sort,
  status,
  onSortChange,
  onStatusChange,
}) => {
  return (
    <div className="flex justify-end  gap-4">
      {/* Sort Select */}
      <Select
        onValueChange={(value) => onSortChange(value === "all" ? null : value)}
        defaultValue={sort || undefined}>
        <SelectTrigger className="w-3/6 md:w-2/6 lg:w-2/12">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter Select */}
      <Select
        onValueChange={(value) =>
          onStatusChange(value === "all" ? null : value)
        }
        defaultValue={status || undefined}>
        <SelectTrigger className="w-3/6 md:w-2/6 lg:w-2/12">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Success">Success</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
          <SelectItem value="Expired">Expired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortAndFilter;
