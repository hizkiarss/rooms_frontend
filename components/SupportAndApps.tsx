import Image from "next/image";
import googleplay from "@/public/footer/googleplay.webp";
import applestore from "@/public/footer/applestore.webp";

const SupportAndApps: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="text-[11px] mt-8 md:text-[13px] flex flex-col gap-3">
        <p className="font-semibold text-[13px]">Support</p>
        <p>Help Center</p>
        <p>Group Booking</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Register Your Hotel</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-semibold">Cheaper on the app</p>
        <Image
          src={applestore}
          alt="applestore.webp"
          className="w-28 md:w-48"
        />
        <Image
          src={googleplay}
          alt="googleplay.webp"
          className="w-28 md:w-48"
        />
      </div>
    </div>
  );
};
export default SupportAndApps;
