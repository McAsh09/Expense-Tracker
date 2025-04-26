import React, { useState } from "react";
import { Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

function Analytics({ expenses }) {
  const [view, setView] = useState("category"); // default to 'category'

  const handleChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Prepare category-wise data
  const categoryData = {};
  expenses.forEach((expense) => {
    const category = expense.category || "Others";
    if (!categoryData[category]) {
      categoryData[category] = 0;
    }
    categoryData[category] += Number(expense.amount);
  });

  const pieChartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Prepare month-wise data
  const monthlyData = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.createdAt);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += Number(expense.amount);
  });

  const lineChartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Analytics Dashboard 📊
      </Typography>

      {/* Toggle buttons */}
      <Box display="flex" justifyContent="center" mb={4}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleChange}
          aria-label="analytics view"
        >
          <ToggleButton value="category" aria-label="category view">
            By Category
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="monthly view">
            By Month
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Conditional Rendering of Charts */}
      {view === "category" ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}

export default Analytics;
