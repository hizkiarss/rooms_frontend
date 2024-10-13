"use client";
import { format } from "date-fns";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileNavItems: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignout = async () => {
    await signOut();
    router.push("/");
  };
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() + 2);
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 3);
  const formattedFromDate = format(fromDate, "yyyy-MM-dd");
  const formattedToDate = format(toDate, "yyyy-MM-dd");
  const isTenant = session?.user?.roles?.includes("TENANT");
  return (
    <div className="flex flex-col space-y-4">
      {!isTenant && (
        <>
          <Link
            href="/become-tenant"
            className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium">
            List your property
          </Link>
          <Link
            href={`/properties?city=Jakarta&from=${formattedFromDate}&to=${formattedToDate}&adult=2&children=0&category=Hotel`}
            className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium">
            Hotel
          </Link>
          <Link
            href={`/properties?city=Jakarta&from=${formattedFromDate}&to=${formattedToDate}&adult=2&children=0&category=Apartment`}
            className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium">
            Apartment
          </Link>
        </>
      )}
      <Link
        href="/user-profile"
        className="text-sm font-medium text-gray-700  hover:text-greenr hover:font-medium">
        Account
      </Link>

      <div
        onClick={handleSignout}
        className="text-sm font-medium text-red-600 hover:text-red-700 w-full">
        Sign out
      </div>
    </div>
  );
};
export default MobileNavItems;
