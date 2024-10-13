import AnimationWrapper from "@/components/animations/AnimationWrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMonthlyTransactions } from "@/hooks/report/useMonthlyTransactions";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { MonthlyTransactionsType } from "@/types/transactions/MonthlyTransactionsType";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const monthAbbreviations = {
  JANUARY: "JAN",
  FEBRUARY: "FEB",
  MARCH: "MAR",
  APRIL: "APR",
  MAY: "MAY",
  JUNE: "JUN",
  JULY: "JUL",
  AUGUST: "AUG",
  SEPTEMBER: "SEP",
  OCTOBER: "OCT",
  NOVEMBER: "NOV",
  DECEMBER: "DEC",
};

const chartConfig = {
  transactions: {
    label: "transactions",
    color: "#007989",
  },
} satisfies ChartConfig;

const MonthlyTransactionsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: monthlyTransactions } = useMonthlyTransactions(
    selectedProperty || ""
  );

  const fetchedData = monthlyTransactions?.map(
    (monthlyTransaction: MonthlyTransactionsType) => {
      const month = monthlyTransaction.month as keyof typeof monthAbbreviations;
      return {
        month:
          monthAbbreviations[month] || monthlyTransaction.month.slice(0, 3),
        transactions: monthlyTransaction.totalTransactions,
      };
    }
  );

  console.log(fetchedData);
  console.log("ini monthlynya", monthlyTransactions);
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const currentMonthName = monthNames[currentMonthIndex];
  const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  const lastMonthName = monthNames[lastMonthIndex];

  const currentMonthTransaction =
    monthlyTransactions?.find(
      (transaction) => transaction.month === currentMonthName
    )?.totalTransactions || 0;

  const lastMonthTransaction =
    monthlyTransactions?.find(
      (transaction) => transaction.month === lastMonthName
    )?.totalTransactions || 0;

  const percentageChange = lastMonthTransaction
    ? ((currentMonthTransaction - lastMonthTransaction) /
        lastMonthTransaction) *
      100
    : 0;

  const isTrendingUp = percentageChange >= 0;
  const icon = isTrendingUp ? (
    <TrendingUp className="h-4 w-4" />
  ) : (
    <TrendingDown className="h-4 w-4" />
  );
  const formattedPercentage = Math.abs(percentageChange).toFixed(0);

  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Monthly transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={fetchedData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} domain={[0, "dataMax"]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="transactions"
                fill="var(--color-transactions)"
                radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {isTrendingUp ? (
              <>
                Trending up by {formattedPercentage}% {icon}
              </>
            ) : (
              <>
                Trending down by {formattedPercentage}% {icon}
              </>
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total transaction this year
          </div>
        </CardFooter>
      </Card>
    </AnimationWrapper>
  );
};
export default MonthlyTransactionsCard;
