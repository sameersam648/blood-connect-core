
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  Edit, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock donor data
const mockDonor = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  bloodType: "O+",
  age: 32,
  weight: 75,
  address: "123 Main Street",
  city: "Springfield",
  state: "IL",
  zipCode: "62704",
  lastDonation: "2023-04-15",
  medicalConditions: "None",
  status: "active",
  registeredDate: "2020-06-10",
  donationHistory: [
    {
      id: "d1",
      date: "2023-04-15",
      amount: 450,
      location: "Springfield Central Hospital",
      status: "completed"
    },
    {
      id: "d2",
      date: "2022-12-05",
      amount: 450,
      location: "Community Blood Drive",
      status: "completed"
    },
    {
      id: "d3",
      date: "2022-08-17",
      amount: 450,
      location: "Springfield Central Hospital",
      status: "completed"
    },
    {
      id: "d4",
      date: "2022-03-22",
      amount: 450,
      location: "Mobile Blood Drive Unit",
      status: "completed"
    }
  ]
};

const DonorDetails = () => {
  // In a real app, we would fetch donor data based on this ID
  const { id } = useParams<{ id: string }>();
  const donor = mockDonor; // In reality: fetch donor using the ID
  
  return (
    <div className="pt-16 pb-8 animate-fade-in">
      {donor && (
        <>
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
                Donor since {new Date(donor.registeredDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-500 mb-3">Contact Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{donor.email}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{donor.phone}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <div>{donor.address}</div>
                          <div>{donor.city}, {donor.state} {donor.zipCode}</div>
                        </div>
                      </li>
                    </ul>
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
                        <div>{new Date(donor.lastDonation).toLocaleDateString()}</div>
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
                      {donor.donationHistory.length}
                    </span>
                    <span className="text-gray-600">Total Donations</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">Last Donation</div>
                      <div className="font-medium">{new Date(donor.lastDonation).toLocaleDateString()}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">Total Blood Donated</div>
                      <div className="font-medium">{donor.donationHistory.length * 450} ml</div>
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
                      <tbody className="bg-white divide-y divide-gray-200">
                        {donor.donationHistory.map((donation) => (
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
                        ))}
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
        </>
      )}
    </div>
  );
};

export default DonorDetails;
