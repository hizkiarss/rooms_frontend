import Image from "next/image";

interface WhyRoomsItemItemProps {
  title: string;
  desc: string;
  src: string;
  alt: string;
}
const WhyRoomsItem: React.FC<WhyRoomsItemItemProps> = ({
  title,
  desc,
  src,
  alt,
}) => {
  return (
    <div className="flex flex-col max-w-[288px] justify-start items-start px-5">
      <div className="mb-2">
        <Image src={src} alt={alt} width={60} height={60} />
      </div>
      <div className="text-xl font-semibold mb-2 text-greenr">{title}</div>
      <div className="wrap mb-2 text-start">{desc}</div>
    </div>
  );
};

export default WhyRoomsItem;
