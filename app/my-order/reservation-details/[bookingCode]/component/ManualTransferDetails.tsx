import { Dot, Info } from "lucide-react";

const ManualTransferDetails: React.FC = () => {
  const accountNumber = "52 6032 2488";
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div className="flex">
          <Dot />
          <div>Manual Transfer</div>
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <Dot />
          <div>
            <p className="">Bank BCA</p>
            <p className="text-sm">PT. Kuki Sukses Makmur</p>
          </div>
        </div>
        <div>{accountNumber}</div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-4">
        <Info className="mr-2" size={16} />
        <p>
          To keep things light and simple, your total payment ends with the last
          3 digits for easy verification!
        </p>
      </div>
    </>
  );
};
export default ManualTransferDetails;
