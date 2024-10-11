import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PropertyPicturesType } from "@/types/property-pictures/PropertyPicturesType";
import { getRatingDescription } from "@/types/review/GetRatingDescription";

// const images = [
//   "/checkout/4cdd2496.webp",
//   "/checkout/7c2de61d.webp",
//   "/checkout/45d6fb98.webp",
//   "/checkout/265d4aae.webp",
// ];

interface RoomDetailCardProps {
  images: PropertyPicturesType[];
  propertyName: string;
  rating: number;
  review: number;
  roomName: string;
  from: string;
  to: string;
  night: number;
}

const RoomDetailCard: React.FC<RoomDetailCardProps> = ({
  images,
  propertyName,
  rating,
  review,
  roomName,
  from,
  to,
  night,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-0 relative">
        <div className="relative h-64 overflow-hidden">
          <img
            src={images[currentImageIndex].imgUrl}
            alt="Hotel view"
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevImage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextImage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>{propertyName}</CardTitle>

        <Separator className="my-4" />
      </CardHeader>

      <CardContent>
        <div className="flex items-center mb-4">
          <div className="bg-green-800 text-white font-semibold py-1 px-2 rounded">
            {rating}
          </div>
          <span className="ml-2 font-semibold">
            {getRatingDescription(rating)}
          </span>
          <span className="ml-2 text-gray-500">({review} reviews)</span>
        </div>
        <p className="mb-2">
          <span className="font-semibold">1 Room:</span> {roomName}
        </p>
        <p className="text-sm text-gray-500 mb-4">Non-refundable</p>
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Check-in: {from}</span>
          </p>
          <p>
            <span className="font-semibold">Check-out: {to}</span>
          </p>
          <p>{night}-night stay</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetailCard;
