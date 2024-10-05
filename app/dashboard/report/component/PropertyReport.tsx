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
  console.log("ini datanya nih", rooms);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const schedulerData: SchedulerData =
    rooms?.map((room) => ({
      id: room.id, // Assign room ID to Scheduler
      label: {
        icon: "https://picsum.photos/24",
        title: room.name, // Assign room name to title
        subtitle: "Room number: " + room.roomNumber, // Optional subtitle
      },
      data: room.bookings.map((booking) => ({
        id: booking.id, // Task ID
        startDate: new Date(booking.startDate), // Convert to Date object
        endDate: new Date(booking.endDate), // Convert to Date object
        title: booking.users.username, // Task title
        subtitle: booking.users.mobileNumber || "", // Optional subtitle
        description: booking.users.email || "", // Optional description
        bgColor: "#007989", // Set a default color or dynamic color
        occupancy : 0
      })),
    })) || [];

  //   const mockedSchedulerData: SchedulerData = [
  //     {
  //       id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
  //       label: {
  //         icon: "https://picsum.photos/24",
  //         title: "Joe Doe",
  //         subtitle: "Frontend Developer",
  //       },
  //       data: [
  //         {
  //           id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
  //           startDate: new Date("2024-09-01"),
  //           endDate: new Date("2024-09-05"),

  //           title: "Project A",
  //           subtitle: "Subtitle A",
  //           description: "Description A",
  //           bgColor: "rgb(254,165,177)",
  //         },
  //         {
  //           id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
  //           startDate: new Date("2024-09-07T09:00:00"),
  //           endDate: new Date("2024-09-10T15:30:00"),

  //           title: "Project B",
  //           subtitle: "Subtitle B",
  //           description: "Description B",
  //           bgColor: "rgb(255,193,7)",
  //         },
  //         {
  //           id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
  //           startDate: new Date("2024-09-03T10:00:00"),
  //           endDate: new Date("2024-09-09T14:00:00"),

  //           title: "Project C",
  //           subtitle: "Subtitle C",
  //           bgColor: "rgb(123,201,111)",
  //         },
  //         {
  //           id: "b088e4ac-9911-426f-aef3-843d75e714c2",
  //           startDate: new Date("2024-09-11T11:30:00"),
  //           endDate: new Date("2024-09-15T12:30:00"),

  //           title: "Project D",
  //           subtitle: "Subtitle D",
  //           description: "Description D",
  //           bgColor: "rgb(233,30,99)",
  //         },
  //       ],
  //     },
  //     {
  //       id: "070ac5b5-8369-4cd2-8ba2-0a209130cc61",
  //       label: {
  //         icon: "https://picsum.photos/24",
  //         title: "Jane Smith",
  //         subtitle: "Backend Developer",
  //       },
  //       data: [
  //         {
  //           id: "01b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
  //           startDate: new Date("2024-09-10T09:00:00"),
  //           endDate: new Date("2024-09-12T17:00:00"),

  //           title: "Project E",
  //           subtitle: "Subtitle E",
  //           description: "Description E",
  //           bgColor: "rgb(33,150,243)",
  //         },
  //         {
  //           id: "02fbe237-6344-4c8e-affb-64a1750f33bd",
  //           startDate: new Date("2024-09-13T08:30:00"),
  //           endDate: new Date("2024-09-16T16:00:00"),

  //           title: "Project F",
  //           subtitle: "Subtitle F",
  //           description: "Description F",
  //           bgColor: "rgb(156,39,176)",
  //         },
  //         {
  //           id: "0301c1cd-f4b5-46bc-8564-8c983919e3f5",
  //           startDate: new Date("2024-09-18T08:00:00"),
  //           endDate: new Date("2024-09-21T12:00:00"),

  //           title: "Project G",
  //           subtitle: "Subtitle G",
  //           bgColor: "rgb(3,169,244)",
  //         },
  //         {
  //           id: "04b088e4ac-9911-426f-aef3-843d75e714c2",
  //           startDate: new Date("2024-09-21T09:00:00"),
  //           endDate: new Date("2024-09-23T18:00:00"),

  //           title: "Project H",
  //           subtitle: "Subtitle H",
  //           description: "Description H",
  //           bgColor: "rgb(255,87,34)",
  //         },
  //       ],
  //     },
  //     {
  //       id: "070ac5b5-8369-4cd2-8ba2-0a209130cc62",
  //       label: {
  //         icon: "https://picsum.photos/24",
  //         title: "Mark Lee",
  //         subtitle: "Designer",
  //       },
  //       data: [],
  //     },
  //   ];

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
        // we use "dayjs" for date calculations, but feel free to use library of your choice
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
          // Some filtering logic...
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
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
