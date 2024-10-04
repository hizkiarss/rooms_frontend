import Image from "next/image";
import wonderfulindo from "@/public/footer/wonderfulindo.webp";

const PartnerSection: React.FC = () => {
  return (
    <div className="md:mt-0">
      <p className="font-semibold mb-2 md:mb-6">Partner</p>
      <div className="flex gap-4 items-center">
        <Image
          src={wonderfulindo}
          alt="Wonderful Indonesia"
          className="w-28 md:w-40 h-auto"
        />
        <p className="text-[9px] md:text-[11px] w-24 md:w-36">
          Official Partner of the Ministry of Tourism, Republic Indonesia
        </p>
      </div>
    </div>
  );
};
export default PartnerSection;
