import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, Plus, Search, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useDonors } from "@/contexts/DonorContext";
import { useToast } from "@/components/ui/use-toast";

const DonorsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [bloodTypeFilter, setBloodTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { donors, deleteDonor } = useDonors();
  const { toast } = useToast();

  // Update search field when URL parameter changes
  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search') || "");
    }
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteDonor(id);
        toast({
          title: "Success",
          description: "Donor deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete donor",
          variant: "destructive",
        });
      }
    }
  };

  const filteredDonors = donors.filter((donor) => {
    const fullName = `${donor.firstName} ${donor.lastName}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.phone.includes(searchTerm);

    const matchesBloodType =
      bloodTypeFilter === "all" || donor.bloodType === bloodTypeFilter;

    const matchesStatus =
      statusFilter === "all" || donor.status === statusFilter;

    return matchesSearch && matchesBloodType && matchesStatus;
  });

  return (
    <div className="pt-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Donors</h1>
          <p className="text-gray-500">Manage and view all blood donors</p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600">
          <Link to="/add-donor">
            <Plus className="h-4 w-4 mr-2" />
            Add New Donor
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Select
                value={bloodTypeFilter}
                onValueChange={setBloodTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Types</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Last Donation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">
                    <div>{donor.firstName} {donor.lastName}</div>
                    <div className="text-sm text-gray-500">{donor.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                      {donor.bloodType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        donor.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {donor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/donors/${donor.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(donor.id, `${donor.firstName} ${donor.lastName}`)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Users className="h-12 w-12 mb-2 opacity-20" />
                    <h3 className="font-medium mb-1">No donors found</h3>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DonorsList;
