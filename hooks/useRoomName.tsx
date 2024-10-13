"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useRoomName = (defaultRoomName: string) => {
    const queryClient = useQueryClient();

    const { data: roomName, isLoading } = useQuery<string>({
        queryKey: ["roomName"],
        queryFn: () => {
            const storedData = localStorage.getItem("roomName");
            if (!storedData) return defaultRoomName;
            try {
                const parsedData = JSON.parse(storedData);
                return typeof parsedData === 'string' ? parsedData : defaultRoomName;
            } catch {
                return storedData; // If it's not valid JSON, return it as-is
            }
        },
        staleTime: Infinity,
    });

    const setRoomName = (newRoomName: string | { createRoom: string }) => {
        const roomNameString = typeof newRoomName === 'string' ? newRoomName : newRoomName.createRoom;
        localStorage.setItem("roomName", JSON.stringify(roomNameString));
        queryClient.setQueryData(["roomName"], roomNameString);
    };

    return { roomName: roomName ?? defaultRoomName, setRoomName, isLoading };
};

export default useRoomName;