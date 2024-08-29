"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useSelectedProperty = () => {
  const queryClient = useQueryClient();

  const { data: selectedProperty, isLoading } = useQuery<string>({
    queryKey: ["selectedProperty"],
    queryFn: () => {
      return localStorage.getItem("selectedProperty") || "";
    },
  });

  const setSelectedProperty = (property: string) => {
    queryClient.setQueryData(["selectedProperty"], property);
    localStorage.setItem("selectedProperty", property);
  };

  return { selectedProperty, isLoading, setSelectedProperty };
};

export default useSelectedProperty;
