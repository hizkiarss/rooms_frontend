import { Dot } from "lucide-react";

interface VirtualAccountDetailsProps {
  vaName: string;
  vaNumber: string;
}

const VirtualAccountDetails: React.FC<VirtualAccountDetailsProps> = ({
  vaName,
  vaNumber,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div className="flex">
          <Dot />
          <div>{vaName}</div>
        </div>
        <div>{vaNumber}</div>
      </div>
    </>
  );
};
export default VirtualAccountDetails;
