import { CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface FormCheckoutHeaderCardProps {
  adult: number;
  children: number;
  bedType: string;
  includeBreakfast: boolean;
}

const FormCheckoutHeaderCard: React.FC<FormCheckoutHeaderCardProps> = ({
  adult,
  children,
  bedType,
  includeBreakfast,
}) => {
  return (
    <CardHeader>
      <CardTitle>Who&apos;s checking in?</CardTitle>
      <div className="text-sm text-muted-foreground">
        <div className="mb-2">
          <span className="font-semibold text-black">Room :</span> {adult}{" "}
          Adults, {children !== 0 ? `${children} Children, ` : ""} 1 {bedType}
        </div>
        <div className="flex text-green-700">
          {includeBreakfast && (
            <div className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              <span>Breakfast included</span>
            </div>
          )}

          <div className="flex items-center ml-1.5">
            <Check className="w-3 h-3 mr-1" />
            <span>Free parking</span>
          </div>
          <div className="flex items-center ml-1.5">
            <Check className="w-3 h-3 mr-1" />
            <span>Free WiFi</span>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};
export default FormCheckoutHeaderCard;
