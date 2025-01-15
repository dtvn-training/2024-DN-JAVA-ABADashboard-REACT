import { FaChartBar, FaCog, FaTachometerAlt } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface NavItemStyle {
  icon: IconType;
  text: string;
  linkTo: string;
}

export const NavItem: NavItemStyle[] = [
  {
    icon: FaTachometerAlt,
    text: "Dashboard View",
    linkTo: "dashboard",
  },
  {
    icon: FaChartBar,
    text: "GTM View",
    linkTo: "gtm-view",
  },
  {
    icon: FaCog,
    text: "GTM Configuration",
    linkTo: "gtm-config",
  }
];
