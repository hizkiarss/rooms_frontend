"use client";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DesktopNavItems from "./DesktopNavItems";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";

const DesktopNavMenu: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("ini isi nya", session?.user);
  const handleSignout = async () => {
    await signOut({
      redirect: false,
    });
  };
  return (
    <div className="flex items-center w-6/12 lg:w-5/12 justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <DesktopNavItems />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden md:flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-200">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          {session && session.user ? (
            <DropdownMenuContent className="w-80 mt-2" align="end">
              <DropdownMenuLabel className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Hi, {session?.user.name}</div>
                  <div className="text-sm text-gray-500">
                    {session?.user.email}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>List of favorites</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="w-80 mt-2" align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push("/login");
                }}>
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
};
export default DesktopNavMenu;
