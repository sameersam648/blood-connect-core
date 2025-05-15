
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const BloodDistributionChart = () => {
  // Mock data for the chart
  const data = [
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
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} units`, 'Amount']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodDistributionChart;
