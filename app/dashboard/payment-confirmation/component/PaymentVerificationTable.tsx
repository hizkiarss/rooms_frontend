"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Check, X } from "lucide-react";

type PaymentProof = {
  id: string;
  orderNumber: string;
  amount: number;
  date: string;
  imageUrl: string;
};

const paymentProofs: PaymentProof[] = [
  {
    id: "1",
    orderNumber: "ORD001",
    amount: 100000,
    date: "2024-08-25",
    imageUrl: "/checkout/45d6fb98.webp",
  },
  {
    id: "2",
    orderNumber: "ORD002",
    amount: 150000,
    date: "2024-08-26",
    imageUrl: "/checkout/45d6fb98.webp",
  },
  // ... tambahkan lebih banyak data sesuai kebutuhan
];

export function PaymentVerificationTable() {
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null);

  const handleApprove = (id: string) => {
    console.log(`Approved payment proof with id: ${id}`);
    // Implementasi logika persetujuan di sini
  };

  const handleReject = (id: string) => {
    console.log(`Rejected payment proof with id: ${id}`);
    // Implementasi logika penolakan di sini
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentProofs.map((proof) => (
              <TableRow key={proof.id}>
                <TableCell>{proof.orderNumber}</TableCell>
                <TableCell>
                  {proof.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(proof.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedProof(proof)}>
                        View Image
                      </Button>
                    </DialogTrigger>
                    <DialogContent className=" px-5 sm:px-10 md:px-20">
                      <DialogHeader>
                        <DialogTitle>Payment Proof</DialogTitle>
                      </DialogHeader>
                      {selectedProof && (
                        <>
                          <div className="mt-2 text-center font-semibold">
                            Transaction Amount:{" "}
                            {selectedProof.amount.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </div>
                          <div className="mt-4">
                            <Image
                              src={selectedProof.imageUrl}
                              alt="Payment Proof"
                              width={500}
                              height={300}
                              layout="responsive"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <Button
                              onClick={() => handleApprove(selectedProof.id)}
                              className="flex-1 mr-2 bg-green-500 hover:bg-green-600">
                              <Check className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button
                              onClick={() => handleReject(selectedProof.id)}
                              className="flex-1 ml-2 bg-red-500 hover:bg-red-600">
                              <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
