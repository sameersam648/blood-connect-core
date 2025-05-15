
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar,
  Database,
  Heart,
  Home,
  Plus,
  Settings,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Donors", icon: Users, path: "/donors" },
    { name: "Add Donor", icon: Plus, path: "/add-donor" },
    { name: "Donations", icon: Heart, path: "/donations" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Inventory", icon: Database, path: "/inventory" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 h-full w-64 bg-white border-r border-gray-200 pt-16 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
    >
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn("h-5 w-5 mr-3", 
                location.pathname === item.path ? "text-red-600" : "text-gray-500"
              )} />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full p-4">
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-medium text-red-700 text-sm mb-2">Blood Drive</h4>
          <p className="text-xs text-gray-600 mb-3">Next blood donation camp on July 22, 2025</p>
          <Link 
            to="/calendar"
            className="text-xs text-red-600 font-medium hover:underline"
          >
            View Calendar →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
