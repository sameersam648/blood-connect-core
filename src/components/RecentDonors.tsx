import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDonors } from "@/contexts/DonorContext";

interface RecentDonor {
  id: string;
  firstName: string;
  lastName: string;
  bloodType: string;
  lastDonation?: string;
  email?: string;
}

interface RecentDonorsProps {
  recentDonors?: RecentDonor[];
}

const RecentDonors = ({ recentDonors = [] }: RecentDonorsProps) => {
  const { donors } = useDonors();
  
  // Use provided recentDonors, or if empty, get most recent donors from context
  const donorsToDisplay = recentDonors.length > 0 
    ? recentDonors
    : [...donors]
        .sort((a, b) => {
          // Sort by id in descending order (most recent first)
          return parseInt(b.id) - parseInt(a.id);
        })
        .slice(0, 4);

  return (
    <div className="space-y-4">
      {donorsToDisplay.length > 0 ? (
        donorsToDisplay.map((donor) => (
          <div
            key={donor.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 donor-card"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-red-100 text-red-700">
                  {donor.firstName.charAt(0)}{donor.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{donor.firstName} {donor.lastName}</div>
                {donor.email && <div className="text-sm text-gray-500">{donor.email}</div>}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-sm text-gray-500">
                  {donor.lastDonation ? "Donated on" : "No donations"}
                </div>
                <div>
                  {donor.lastDonation 
                    ? new Date(donor.lastDonation).toLocaleDateString() 
                    : "N/A"}
                </div>
              </div>
              
              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                {donor.bloodType}
              </Badge>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/donors/${donor.id}`}>View</Link>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No donors found. Add your first donor.</p>
        </div>
      )}
      
      <div className="flex justify-center pt-2">
        <Button variant="outline" asChild>
          <Link to="/donors">View All Donors</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentDonors;
