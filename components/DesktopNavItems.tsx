import { NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";

const DesktopNavItems: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          href="become-tenant">
          List your property
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          href="#">
          Support
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          href="#">
          Trips
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
  );
};
export default DesktopNavItems;
