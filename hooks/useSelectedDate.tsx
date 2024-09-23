"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const useSelectedDate = () => {
  const queryClient = useQueryClient();

  const { data: selectedDates, isLoading } = useQuery<{
    startDate: string;
    endDate: string;
  }>({
    queryKey: ["selectedDates"],
    queryFn: () => {
      const startDate = localStorage.getItem("startDate") || "";
      const endDate = localStorage.getItem("endDate") || "";
      return { startDate, endDate };
    },
  });

  const setSelectedDates = (startDate: string, endDate: string) => {
    queryClient.setQueryData(["selectedDates"], { startDate, endDate });
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  };

  return { selectedDates, isLoading, setSelectedDates };
};

export default useSelectedDate;
