"use client";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { SetStateAction, useCallback, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import styled from "styled-components";
import { usePropertyReportByPropertyId } from "@/hooks/report/usePropertyReportByPropertyId";
import useSelectedProperty from "@/hooks/useSelectedProperty";

export const StyledSchedulerFrame = styled.div`
  position: relative;
  height: 50vh;
  width: 150vh;
`;

const PropertyReport = () => {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedProperty } = useSelectedProperty();
  const { data: rooms } = usePropertyReportByPropertyId(selectedProperty || "");

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const schedulerData: SchedulerData =
    rooms?.map((room) => ({
      id: room.id,
      label: {
        icon: "https://picsum.photos/24",
        title: room.name,
        subtitle: "Room number: " + room.roomNumber,
      },
      data: room.bookings.map((booking) => ({
        id: booking.id,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        title: booking.users.username,
        subtitle: booking.users.mobileNumber || "",
        description: booking.users.email || "",
        occupancy: 3600,
        bgColor: "#007989",
      })),
    })) || [];

  const handleRangeChange = useCallback(
    (range: SetStateAction<{ startDate: Date; endDate: Date }>) => {
      setRange(range);
    },
    []
  );
  const filteredMockedSchedulerData = schedulerData.map((person) => ({
    ...person,
    data: person.data.filter(
      (project) =>
        dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
        dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
        (dayjs(project.startDate).isBefore(range.startDate, "day") &&
          dayjs(project.endDate).isAfter(range.endDate, "day"))
    ),
  }));
  return (
    <StyledSchedulerFrame>
      <Scheduler
        data={filteredMockedSchedulerData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          setFilterButtonState(0);
        }}
        config={{
          zoom: 1,
          filterButtonState: -1,
          showTooltip: false,
        }}
      />
    </StyledSchedulerFrame>
  );
};
export default PropertyReport;
