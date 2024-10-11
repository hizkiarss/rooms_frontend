import AnimationWrapper from "@/components/animations/AnimationWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Faq = () => {
  return (
    <div className="py-16 flex flex-col text-center px-5 sm:px-10 md:px-20 lg:px-[80px]">
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <p className="mb-2 font-semibold text-3xl">FAQs</p>
        <h2 className="font-semibold text-xl mb-10">
          Got questions? We&apos;ve got answers! Explore our FAQs and find out
          everything you need to know to start hosting like a pro!
        </h2>

        <div className="flex flex-row justify-center gap flex-wrap ">
          <Card className="w-11/12">
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I become a rooms host?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hosting with us is a breeze! Just hit the &quot;List your
                    property&quot; button on the main menu and you&apos;re on your way to
                    becoming the next superstar host on Rooms. It&apos;s free, fast,
                    and totally easy!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How do I manage my property?
                  </AccordionTrigger>
                  <AccordionContent>
                    Managing your property is a piece of cake with our platform!
                    From the Rooms dashboard, you can easily create and update
                    listings, sync your calendar, and communicate with
                    guests—all while sipping your favorite drink. Our
                    user-friendly tools make everything smooth, and if you need
                    help, our support team has your back!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What details should I include about my property?
                  </AccordionTrigger>
                  <AccordionContent>
                    Let&apos;s make your listing pop! Be sure to include all the
                    cool features and amenities your place offers—after all,
                    guests love details. We&apos;ll guide you through
                    everything, and if you need to step away for a moment,
                    don&apos;t worry, we&apos;ll save your info. It&apos;s as
                    easy as pie!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default Faq;
