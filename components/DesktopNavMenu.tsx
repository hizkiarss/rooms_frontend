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
  const handleSignout = async () => {
    await signOut();
    router.push("/");
  };
  const isTenant = session?.user?.roles?.includes("TENANT");
  return (
    <div className="flex items-center px-2 w-8/12 lg:w-5/12 justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {!isTenant && <DesktopNavItems />}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {session && session.user ? (
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
              <DropdownMenuItem onClick={() => router.push("/user-profile")}>
                Account
              </DropdownMenuItem>
              {isTenant && (
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="hidden md:flex space-x-2">
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="text-sm font-medium ml-2">
            Login
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/register")}
            className="text-sm font-medium">
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};
export default DesktopNavMenu;
