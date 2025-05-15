import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; 
import BloodDistributionChart from "@/components/BloodDistributionChart";
import RecentDonors from "@/components/RecentDonors";
import { useDonors } from "@/contexts/DonorContext";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { stats, donors, loading, refreshDonors } = useDonors();
  const [bloodTypeCounts, setBloodTypeCounts] = useState<{ type: string; count: number; percentage: number }[]>([]);
  
  useEffect(() => {
    refreshDonors();
  }, [refreshDonors]);

  useEffect(() => {
    if (stats?.bloodTypes) {
      // Calculate percentages based on the maximum count
      const maxCount = Math.max(...stats.bloodTypes.map((bt: any) => bt.count));
      const calculatedBloodTypes = stats.bloodTypes.map((bt: any) => ({
        type: bt.bloodType,
        count: bt.count,
        percentage: Math.round((bt.count / (maxCount || 1)) * 100)
      }));
      setBloodTypeCounts(calculatedBloodTypes);
    }
  }, [stats]);

  // Generate dashboard stats
  const dashboardStats = [
    { 
      title: "Total Donors", 
      value: stats?.counts?.total || "0",
      change: "+0%" 
    },
    { 
      title: "Active Donors", 
      value: stats?.counts?.active || "0",
      change: `${stats?.counts?.active > 0 ? '+' : ''}${Math.round(((stats?.counts?.active || 0) / (stats?.counts?.total || 1)) * 100)}%` 
    },
    { 
      title: "Inactive Donors", 
      value: stats?.counts?.inactive || "0",
      change: `${stats?.counts?.inactive > 0 ? '+' : ''}${Math.round(((stats?.counts?.inactive || 0) / (stats?.counts?.total || 1)) * 100)}%` 
    },
    { 
      title: "Blood Types", 
      value: bloodTypeCounts.length.toString(),
      change: "" 
    },
  ];

  // Render loading state while data is being fetched
  if (loading && !stats) {
    return (
      <div className="pt-16 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                {stat.change && (
                  <span className={`text-sm font-medium ${
                    stat.change.includes("+") ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                )}
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
              {bloodTypeCounts.length > 0 ? (
                bloodTypeCounts.map((bloodType) => (
                  <div key={bloodType.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Type {bloodType.type}</span>
                      <span className="text-gray-500">{bloodType.count} donors</span>
                    </div>
                    <Progress 
                      value={bloodType.percentage} 
                      className={`h-2 ${bloodType.percentage < 30 ? "bg-red-500" : "bg-red-400"}`} 
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No blood type data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Blood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BloodDistributionChart bloodTypeData={bloodTypeCounts} />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentDonors recentDonors={stats?.recentDonors || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
