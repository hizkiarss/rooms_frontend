import { RoomType } from "@/types/rooms/RoomsType";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_ROOM_BY_SLUG } from "../graphQL/queries";

export const useRoomBySlug = (slug: string) => {
  return useQuery<RoomType | null>({
    queryKey: ["Room", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug is required");
      }
      try {
        const response = await graphqlClient.request(GET_ROOM_BY_SLUG, {
          slug,
        });
        if (!response || !response.roomBySlug) {
          throw new Error("No Room data in the response");
        }

        return response.roomBySlug;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching room:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
  });
};
