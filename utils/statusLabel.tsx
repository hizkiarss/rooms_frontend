export const getStatusLabel = (status: string) => {
  switch (status) {
    case "Pending":
      return "Waiting Payment";
    case "Check":
      return "Waiting Confirmation From Tenant";
    case "Cancelled":
      return "Cancelled";
    case "Rejected":
      return "Payment Proof Declined";
    case "Expired":
      return "Transaction Expired";
    case "Success":
      return "Success";
    default:
      return status;
  }
};
