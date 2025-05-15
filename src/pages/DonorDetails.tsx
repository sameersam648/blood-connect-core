import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  Edit, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  ArrowUp,
  ArrowDown,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDonors } from "@/contexts/DonorContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DonorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDonorById, deleteDonor } = useDonors();
  const { toast } = useToast();
  const [donor, setDonor] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const donorData = getDonorById(id);
      setDonor(donorData);
    }
  }, [id, getDonorById]);

  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await deleteDonor(id);
        toast({
          title: "Success",
          description: "Donor deleted successfully",
        });
        navigate("/donors");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete donor",
          variant: "destructive",
        });
      }
    }
  };

  if (!donor) {
    return <div className="pt-16 text-center">Loading...</div>;
  }

  return (
    <div className="pt-16 pb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {donor.firstName} {donor.lastName}
            </h1>
            <Badge
              className={
                donor.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {donor.status}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">
            Donor since {new Date(donor.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link to={`/donors/${donor.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => alert("This would schedule a donation in a real app")}
          >
            <Heart className="h-4 w-4 mr-2" />
            Schedule Donation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-500 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{donor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{donor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>
                      {donor.address}, {donor.city}, {donor.state} {donor.zipCode}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-500 mb-3">Medical Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Blood Type</div>
                    <div className="font-semibold text-lg text-red-600">{donor.bloodType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div>{donor.age} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Weight</div>
                    <div>{donor.weight} kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Donation</div>
                    <div>{donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'Never'}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Medical Conditions</div>
                  <div>{donor.medicalConditions || "None reported"}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Donation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-red-600">
                  {donor.donationCount || 0}
                </span>
                <span className="text-gray-600">Total Donations</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Last Donation</div>
                  <div className="font-medium">
                    {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'Never'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Total Blood Donated</div>
                  <div className="font-medium">{(donor.donationCount || 0) * 450} ml</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Eligibility</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Eligible
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="donations">
        <TabsList className="mb-4">
          <TabsTrigger value="donations">Donation History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="donations">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donor.donations?.length > 0 ? (
                      donor.donations.map((donation: any) => (
                        <tr key={donation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{new Date(donation.date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {donation.amount} ml
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {donation.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">
                              {donation.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No donation history available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Donor Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic text-center py-6">
                No notes have been added for this donor yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonorDetails;
