import { useState } from "react";
import { Calendar, Filter, Plus } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock donation data
  const donations = [
    {
      id: "1",
      donorName: "John Doe",
      bloodType: "O+",
      amount: 450,
      date: "2024-03-15",
      location: "Central Blood Bank",
      status: "completed",
    },
    {
      id: "2",
      donorName: "Jane Smith",
      bloodType: "A-",
      amount: 450,
      date: "2024-03-14",
      location: "Mobile Drive Unit",
      status: "scheduled",
    },
    // Add more mock data as needed
  ];

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.donorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Donations</h1>
          <p className="text-gray-500">Manage and track blood donations</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Donation
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search by donor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
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
              <TableHead>Donor</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  {donation.donorName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {donation.bloodType}
                  </Badge>
                </TableCell>
                <TableCell>{donation.amount} ml</TableCell>
                <TableCell>
                  {new Date(donation.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{donation.location}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      donation.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Donations; 