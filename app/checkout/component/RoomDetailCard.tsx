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

const images = [
  "/checkout/4cdd2496.webp",
  "/checkout/7c2de61d.webp",
  "/checkout/45d6fb98.webp",
  "/checkout/265d4aae.webp",
];

const RoomDetailCard = () => {
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
            src={images[currentImageIndex]}
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
        <CardTitle>
          Santhiya Koh Yao Yai Resort & Spa Compulsory Join Santhiya Speedboat
          from / to Ao Po Grand Marina at Phuket
        </CardTitle>

        <Separator className="my-4" />
      </CardHeader>

      <CardContent>
        <div className="flex items-center mb-4">
          <div className="bg-green-800 text-white font-semibold py-1 px-2 rounded">
            8.8
          </div>
          <span className="ml-2 font-semibold">Excellent</span>
          <span className="ml-2 text-gray-500">(1,010 reviews)</span>
        </div>
        <p className="mb-2">
          <span className="font-semibold">1 Room:</span> Exclusive Deal -
          Supreme Deluxe Sea View with Complimentary THB 1,000 Net Hotel Credit
          per night
        </p>
        <p className="text-sm text-gray-500 mb-4">Non-refundable</p>
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Check-in: Tue, Sep 3</span>
          </p>
          <p>
            <span className="font-semibold">Check-out: Wed, Sep 4</span>
          </p>
          <p>1-night stay</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetailCard;
