import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock upcoming donations
  const upcomingDonations = [
    {
      id: "1",
      donorName: "John Doe",
      bloodType: "O+",
      date: "2024-03-20",
      time: "10:00 AM",
      location: "Central Blood Bank",
    },
    {
      id: "2",
      donorName: "Jane Smith",
      bloodType: "A-",
      date: "2024-03-22",
      time: "2:30 PM",
      location: "Mobile Drive Unit",
    },
    {
      id: "3",
      donorName: "Robert Johnson",
      bloodType: "B+",
      date: "2024-03-25",
      time: "11:15 AM",
      location: "Community Center",
    },
  ];

  return (
    <div className="pt-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Calendar</h1>
          <p className="text-gray-500">Schedule and manage donation appointments</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Donation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Donation Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">{donation.donorName}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(donation.date).toLocaleDateString()} at{" "}
                        {donation.time}
                      </div>
                      <div className="mt-1">{donation.location}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {donation.bloodType}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage; 