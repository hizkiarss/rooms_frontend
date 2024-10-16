export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
    case "Check":
      return "text-yellow-500 border-yellow-500";
    case "Success":
      return "text-greenr border-greenr";
    case "Cancelled":
    case "Rejected":
    case "Expired":
      return "text-red-500 border-red-500";
    default:
      return "";
  }
};
