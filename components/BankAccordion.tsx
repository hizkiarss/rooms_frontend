import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { bankData } from "@/types/transactions/BankData";

interface PaymentStep {
  title: string;
  steps: string[];
}

interface BankAccordionProps {
  bank: keyof typeof bankData;
}

const BankAccordion: React.FC<BankAccordionProps> = ({ bank }) => {
  const data = bankData[bank] || { items: [] };

  return (
    <Accordion type="single" collapsible className="w-full border rounded-md">
      {data.items.map((item, index) => (
        <AccordionItem className="px-2" value={`item-${index + 1}`} key={index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2">
              {item.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default BankAccordion;
