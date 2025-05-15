
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/donors?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full top-0 z-30">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 md:mr-4"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B+</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 hidden md:block">
                Blood Bank
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center max-w-md flex-1 mx-4 md:mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search donors..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-600">
            Help
          </Button>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
