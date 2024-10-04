import Image from "next/image";
import logopng from "@/public/logo.png";
import chat from "@/public/footer/chat.webp";
import mail from "@/public/footer/mail.webp";
import callCenter from "@/public/footer/call_center.webp";

const LogoAndContact: React.FC = () => {
  return (
    <div>
      <Image
        src={logopng}
        alt="logo.png"
        className="w-32 md:w-40 h-auto mt-6"
      />
      <div className="flex flex-col md:gap-8 text-[11px] md:text-[13px] tracking-tight mt-8 md:mt-4 border-dotted border-b-2 md:border-b-0 pb-6">
        <div className="flex flex-col gap-8">
          <div className="flex gap-[6px]">
            <Image src={chat} alt="chat.webp" className="w-8" />
            <div>
              <p className="mb-[1px] text-gray-500">WhatsApp</p>
              <p> +62 858 1150 0888</p>
            </div>
          </div>

          <div className="flex gap-[6px]">
            <Image src={mail} alt="email.webp" className="w-8" />
            <div>
              <p className="mb-[1px] text-gray-600">Email</p>
              <p> cs@rooms.com</p>
            </div>
          </div>
        </div>

        <div className="flex gap-[6px] items-start">
          <Image src={callCenter} alt="callcenter.webp" className="w-8" />
          <div>
            <p className="mb-[1px] text-gray-600">Call Center</p>
            <p>Indonesia only</p>
            <p className="mb-[12px]"> +62 804 1500 878</p>
            <p>International</p>
            <p>+62 21 3973 0888</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogoAndContact;
