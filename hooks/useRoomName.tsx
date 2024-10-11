"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useRoomName = (defaultRoomName: string) => {
    const queryClient = useQueryClient();

    const { data: roomName, isLoading } = useQuery<string>({
        queryKey: ["roomName"],
        queryFn: () => {
            const storedData = localStorage.getItem("roomName");
            return storedData ? JSON.parse(storedData) : defaultRoomName;
        },
        staleTime: Infinity,
    });

    const setRoomName = (newRoomName: string) => {
        localStorage.setItem("roomName", JSON.stringify(newRoomName));
        queryClient.setQueryData(["roomName"], newRoomName);
    };

    return { roomName: roomName ?? defaultRoomName, setRoomName, isLoading };
};

export default useRoomName;
