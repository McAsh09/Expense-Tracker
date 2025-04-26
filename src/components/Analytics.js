import React from "react";
import { Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

function Analytics({ expenses }) {
  // Group expenses by category
  const categoryData = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Others"; // fallback if category is missing
    if (!categoryData[category]) {
      categoryData[category] = 0;
    }
    categoryData[category] += Number(expense.amount);
  });

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Expenditure by Category
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Analytics;
