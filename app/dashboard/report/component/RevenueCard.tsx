"use client";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRevenueByPropertyId } from "@/hooks/report/useRevenueByPropertyId";
import { useRevenueWithTaxByPropertyId } from "@/hooks/report/useRevenueWithTaxByPropertyId";
import { useTaxByPropertyId } from "@/hooks/report/useTaxByPropertyId";
import useSelectedDate from "@/hooks/useSelectedDate";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { DollarSign } from "lucide-react";
import * as React from "react";

const RevenueCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { selectedDates } = useSelectedDate();
  const currentYear = new Date().getFullYear();

  const { data: revenue, isLoading: revenueLoading } = useRevenueByPropertyId(
    selectedProperty || "",
    selectedDates?.startDate
      ? new Date(selectedDates.startDate)
      : new Date(currentYear, 0, 1),
    selectedDates?.endDate
      ? new Date(selectedDates.endDate)
      : new Date(currentYear, 11, 31)
  );

  const { data: tax, isLoading: taxLoading } = useTaxByPropertyId(
    selectedProperty || "",
    selectedDates?.startDate
      ? new Date(selectedDates.startDate)
      : new Date(currentYear, 0, 1),
    selectedDates?.endDate
      ? new Date(selectedDates.endDate)
      : new Date(currentYear, 11, 31)
  );

  const { data: revenueWithTax, isLoading: revenueWithTaxLoading } =
    useRevenueWithTaxByPropertyId(
      selectedProperty || "",
      selectedDates?.startDate
        ? new Date(selectedDates.startDate)
        : new Date(currentYear, 0, 1),
      selectedDates?.endDate
        ? new Date(selectedDates.endDate)
        : new Date(currentYear, 11, 31)
    );

  const formattedNumber = (value: number | 0) => {
    if (value === null) return "Rp. 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const plugin = React.useRef(
    emblaCarouselAutoplay({ delay: 8000, stopOnInteraction: true })
  );

  const cardData = [
    {
      title: "Revenue",
      value: revenue,
      isLoading: revenueLoading,
    },
    {
      title: "Tax",
      value: tax,
      isLoading: taxLoading,
    },
    {
      title: "Revenue With Tax",
      value: revenueWithTax,
      isLoading: revenueWithTaxLoading,
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current as any]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {cardData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <DollarSign className="w-4" />
                </CardHeader>
                <CardContent>
                  {item.isLoading ? (
                    <LoadingAnimation />
                  ) : (
                    <div className="text-2xl font-bold">
                      {formattedNumber(item.value || 0)}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RevenueCard;
