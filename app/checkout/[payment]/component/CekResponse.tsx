import { useVirtualAccountResponse } from "@/hooks/payment/useVirtualAccountResponse";
import React from "react";

const CekResponse = () => {
  const { data: virtualAccountResponse } = useVirtualAccountResponse();

  console.log("virtualAccountResponse:", virtualAccountResponse);

  return (
    <div>
      {virtualAccountResponse &&
      virtualAccountResponse.va_numbers.length > 0 ? (
        <div>{virtualAccountResponse.va_numbers[0].va_number}</div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default CekResponse;
