
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; 
import BloodDistributionChart from "@/components/BloodDistributionChart";
import RecentDonors from "@/components/RecentDonors";

const Dashboard = () => {
  // This would normally be fetched from an API
  const bloodTypes = [
    { type: "A+", count: 32, percentage: 75 },
    { type: "A-", count: 14, percentage: 45 },
    { type: "B+", count: 28, percentage: 65 },
    { type: "B-", count: 11, percentage: 30 },
    { type: "AB+", count: 7, percentage: 25 },
    { type: "AB-", count: 4, percentage: 15 },
    { type: "O+", count: 36, percentage: 85 },
    { type: "O-", count: 18, percentage: 50 },
  ];

  const stats = [
    { title: "Total Donors", value: "524", change: "+12%" },
    { title: "This Month", value: "48", change: "+4%" },
    { title: "Donations", value: "1,284", change: "+18%" },
    { title: "Requests", value: "256", change: "-2%" },
  ];

  return (
    <div className="pt-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`text-sm font-medium ${
                  stat.change.includes("+") ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Blood Type Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bloodTypes.map((bloodType) => (
                <div key={bloodType.type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Type {bloodType.type}</span>
                    <span className="text-gray-500">{bloodType.count} units</span>
                  </div>
                  <Progress value={bloodType.percentage} className="h-2" 
                    indicatorClassName={bloodType.percentage < 30 ? "bg-red-500" : "bg-red-400"} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Blood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BloodDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentDonors />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
