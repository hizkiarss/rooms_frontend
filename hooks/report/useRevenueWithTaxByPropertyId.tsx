import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REVENUE_WITH_TAX_BY_PROPERTY } from "../graphQL/queries";

export const useRevenueWithTaxByPropertyId = (
  propertyId: string,
  startDate: Date,
  endDate: Date
) => {
  const { data: session } = useSession();
  return useQuery<number | null>({
    queryKey: ["RevenueWithTax", "property", propertyId, startDate, endDate],
    queryFn: async () => {
      try {
        const startDateISO = startDate.toISOString().split("T")[0];
        const endDateISO = endDate.toISOString().split("T")[0];

        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        const response = await graphqlClient.request(
          REVENUE_WITH_TAX_BY_PROPERTY,
          {
            propertyId: propertyId,
            startDate: startDateISO,
            endDate: endDateISO,
          }
        );

        if (!response || !response.revenueWithTaxByProperty) {
          throw new Error("No Revenue with tax data in the response");
        }

        return response.revenueWithTaxByProperty;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
        } else {
        }
        throw error;
      }
    },
    enabled: !!propertyId && !!startDate && !!endDate,
  });
};
