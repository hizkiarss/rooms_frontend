import AnimationWrapper from "@/components/animations/AnimationWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PropertyReservationDetailCardProps {
  imgUrl: string;
  propertyName: string;
  propertyAddress: string;
  slug: string;
}

const PropertyReservationDetailCard: React.FC<
  PropertyReservationDetailCardProps
> = ({ imgUrl, propertyName, propertyAddress, slug }) => {
  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <span>Accommodation Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="text-lg flex items-center mb-2">
              <div className="p-2 rounded-lg mr-2">
                <Image src={imgUrl} alt="Icon" width={60} height={60} />
              </div>
              <div className="flex-col">
                <div>{propertyName}</div>
                <div className="flex gap-2">
                  <div>{propertyAddress}</div>
                </div>
              </div>
            </div>

            <Link
              href={`/property-detail?slugs=${slug}`}
              className="font-semibold text-greenr hover:underline">
              Details
            </Link>
          </div>
        </CardContent>
      </Card>
    </AnimationWrapper>
  );
};
export default PropertyReservationDetailCard;
