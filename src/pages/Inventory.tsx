import { useState } from "react";
import { Download, Filter, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Inventory = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock inventory data
  const bloodInventory = [
    {
      type: "A+",
      units: 150,
      capacity: 200,
      trend: "up",
      lastUpdated: "2024-03-15",
    },
    {
      type: "A-",
      units: 45,
      capacity: 100,
      trend: "down",
      lastUpdated: "2024-03-15",
    },
    {
      type: "B+",
      units: 80,
      capacity: 150,
      trend: "up",
      lastUpdated: "2024-03-15",
    },
    {
      type: "B-",
      units: 30,
      capacity: 75,
      trend: "stable",
      lastUpdated: "2024-03-15",
    },
    {
      type: "AB+",
      units: 25,
      capacity: 50,
      trend: "down",
      lastUpdated: "2024-03-15",
    },
    {
      type: "AB-",
      units: 15,
      capacity: 30,
      trend: "stable",
      lastUpdated: "2024-03-15",
    },
    {
      type: "O+",
      units: 200,
      capacity: 300,
      trend: "up",
      lastUpdated: "2024-03-15",
    },
    {
      type: "O-",
      units: 100,
      capacity: 200,
      trend: "down",
      lastUpdated: "2024-03-15",
    },
  ];

  // Calculate total stats
  const totalUnits = bloodInventory.reduce((sum, item) => sum + item.units, 0);
  const totalCapacity = bloodInventory.reduce((sum, item) => sum + item.capacity, 0);
  const criticalTypes = bloodInventory.filter(
    (item) => (item.units / item.capacity) * 100 < 30
  ).length;

  return (
    <div className="pt-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Blood Inventory</h1>
          <p className="text-gray-500">Monitor and manage blood stock levels</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {totalUnits} / {totalCapacity}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalUnits / totalCapacity) * 100).toFixed(1)}%
            </div>
            <Progress
              value={(totalUnits / totalCapacity) * 100}
              className="h-2 mt-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              Of total storage capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Types</CardTitle>
            <Badge
              variant="outline"
              className={
                criticalTypes > 0
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }
            >
              {criticalTypes} Types
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((criticalTypes / bloodInventory.length) * 100).toFixed(1)}%
            </div>
            <Progress
              value={((bloodInventory.length - criticalTypes) / bloodInventory.length) * 100}
              className="h-2 mt-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              Blood types below 30% capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Type Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bloodInventory.map((item) => (
              <div
                key={item.type}
                className="p-4 rounded-lg border border-gray-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 text-lg"
                  >
                    {item.type}
                  </Badge>
                  {item.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : item.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : null}
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {item.units} / {item.capacity}
                  </div>
                  <Progress
                    value={(item.units / item.capacity) * 100}
                    className="h-2 mt-2"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory; 