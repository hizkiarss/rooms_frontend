import Link from "next/link";
import UnauthorizedAnimation from "./animations/UnauthorizedAnimation";

const UnauthorizedSign: React.FC = () => {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <UnauthorizedAnimation />
      <h1 className="text-4xl text-center font-bold">
        401 - Oops! You&apos;re not supposed to be here...
      </h1>
      <p className="mt-4 text-center">
        Looks like you&apos;re trying to sneak into a restricted area. Unfortunately,
        you don&apos;t have the magic key for this page!
      </p>
      <Link
        href="/"
        className="mt-6 text-greenr font-semibold hover:underline text-center">
        Let&apos;s head back home before anyone notices!
      </Link>
    </div>
  );
};
export default UnauthorizedSign;
