import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const BookCta = () => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <div className="flex  text-green-700">
            <Check className="w-7 h-7 mr-1" />
            <span>
              You have good taste! Book now before someone else grabs it!
            </span>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default BookCta;
