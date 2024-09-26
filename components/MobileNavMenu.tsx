import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileNavItems from "./MobileNavItems";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="mt-6">
            {session && session.user ? (
              <>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
                  Menu
                </h3>
                <div className="mb-2">
                  <div className="font-semibold">Hi, {session?.user.name}</div>
                  <div className="text-sm text-gray-500">
                    {session?.user.email}
                  </div>
                </div>
                <MobileNavItems />
              </>
            ) : (
              <div className="w-full">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 ">
                  Login
                </Link>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNavMenu;
