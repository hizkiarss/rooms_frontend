import { format } from "date-fns";
import { NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";

const DesktopNavItems: React.FC = () => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() + 2);
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 3);
  const formattedFromDate = format(fromDate, "yyyy-MM-dd");
  const formattedToDate = format(toDate, "yyyy-MM-dd");

  return (
    <div className="flex items-center space-x-4">
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium"
          href="/become-tenant">
          List your property
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium"
          href={`/properties?city=Jakarta&from=${formattedFromDate}&to=${formattedToDate}&adult=2&children=0&category=Hotel`}>
          Hotel
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className="text-sm font-medium text-gray-700 hover:text-greenr hover:font-medium"
          href={`/properties?city=Jakarta&from=${formattedFromDate}&to=${formattedToDate}&adult=2&children=0&category=Apartment`}>
          Apartment
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
  );
};
export default DesktopNavItems;
