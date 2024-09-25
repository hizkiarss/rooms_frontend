"use client";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLatestTransactionsByPropertyId } from "@/hooks/report/useLatestTransactions";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { Avatar } from "@radix-ui/react-avatar";

type LatestTransaction = {
  name: string;
  email: string;
  amount: number;
};

const recentSales: LatestTransaction[] = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999.0 },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39.0 },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.0,
  },
  { name: "William Kim", email: "will@email.com", amount: 99.0 },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39.0 },
];

const LatestTransactionsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: latestTransactions } = useLatestTransactionsByPropertyId(
    selectedProperty || ""
  );
  console.log("ini transaksinya", latestTransactions);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <p className="text-sm text-muted-foreground">
          You made 265 transactions this month.
        </p>
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
  );
};
export default LatestTransactionsCard;
