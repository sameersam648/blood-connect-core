import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface BloodTypeData {
  type: string;
  count: number;
  percentage: number;
}

interface BloodDistributionChartProps {
  bloodTypeData?: BloodTypeData[];
}

const BLOOD_TYPE_COLORS = {
  "A+": "#ef4444",
  "A-": "#f87171",
  "B+": "#dc2626",
  "B-": "#b91c1c",
  "AB+": "#991b1b",
  "AB-": "#7f1d1d",
  "O+": "#c53030",
  "O-": "#e53e3e",
};

const BloodDistributionChart = ({ bloodTypeData = [] }: BloodDistributionChartProps) => {
  // Create chart data from the provided blood type data
  const chartData = bloodTypeData.length > 0 
    ? bloodTypeData.map(bt => ({
        name: bt.type,
        value: bt.count,
        color: BLOOD_TYPE_COLORS[bt.type as keyof typeof BLOOD_TYPE_COLORS] || "#ef4444"
      }))
    : [
        { name: "A+", value: 32, color: "#ef4444" },
        { name: "A-", value: 14, color: "#f87171" },
        { name: "B+", value: 28, color: "#dc2626" },
        { name: "B-", value: 11, color: "#b91c1c" },
        { name: "AB+", value: 7, color: "#991b1b" },
        { name: "AB-", value: 4, color: "#7f1d1d" },
        { name: "O+", value: 36, color: "#c53030" },
        { name: "O-", value: 18, color: "#e53e3e" },
      ];

  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} donors`, 'Count']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodDistributionChart;
