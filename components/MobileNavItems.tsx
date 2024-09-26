"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const MobileNavItems: React.FC = () => {
  const handleSignout = async () => {
    await signOut({ redirect: false });
  };
  return (
    <div className="flex flex-col space-y-4">
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900">
        List your property
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Support
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Trips
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Account
      </Link>
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900">
        List of favorites
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
