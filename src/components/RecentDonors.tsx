
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for recent donors
const recentDonors = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    bloodType: "O+",
    date: "2023-05-12",
    avatar: "JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bloodType: "A-",
    date: "2023-05-10",
    avatar: "JS",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    bloodType: "B+",
    date: "2023-05-08",
    avatar: "RJ",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    bloodType: "AB+",
    date: "2023-05-05",
    avatar: "ED",
  },
];

const RecentDonors = () => {
  return (
    <div className="space-y-4">
      {recentDonors.map((donor) => (
        <div
          key={donor.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 donor-card"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="bg-red-100 text-red-700">
                {donor.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{donor.name}</div>
              <div className="text-sm text-gray-500">{donor.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <div className="text-sm text-gray-500">Donated on</div>
              <div>{new Date(donor.date).toLocaleDateString()}</div>
            </div>
            
            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
              {donor.bloodType}
            </Badge>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/donors/${donor.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center pt-2">
        <Button variant="outline" asChild>
          <Link to="/donors">View All Donors</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentDonors;
