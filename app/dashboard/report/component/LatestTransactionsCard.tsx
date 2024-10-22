"use client";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLatestTransactionsByPropertyId } from "@/hooks/report/useLatestTransactions";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { Avatar } from "@radix-ui/react-avatar";

const LatestTransactionsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: latestTransactions } = useLatestTransactionsByPropertyId(
    selectedProperty || ""
  );
  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {latestTransactions && latestTransactions.length > 0 ? (
              latestTransactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{transaction.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.firstName + " " + transaction.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.mobileNumber}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +Rp. {transaction.finalPrice.toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <EmptyDataAnimation
                message="No transactions so far, but good things are coming!"
                width={200}
                height={200}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </AnimationWrapper>
  );
};
export default LatestTransactionsCard;
