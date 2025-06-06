import React, { useState } from "react";
import {
  Stack,
  Typography,
  MenuItem,
  TextField,
  Paper,
  Box,
} from "@mui/material";
import ExpenseItem from "./ExpenseItem";

const categories = ["All", "Food", "Travel", "Shopping", "Bills", "Other"];
const sortOptions = ["Newest First", "Highest Amount"];

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === "Newest First") {
      return new Date(b.date) - new Date(a.date);
    } else if (sort === "Highest Amount") {
      return Number(b.amount) - Number(a.amount);
    }
    return 0;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  if (expenses.length === 0) {
    return <Typography align="center">No expenses added yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Paper
        elevation={3}
        sx={{ p: 2, bgcolor: "#e3f2fd", textAlign: "center", borderRadius: 2 }}
      >
        <Typography variant="h6">
          Total Expenses: ₹{totalAmount.toFixed(2)}
        </Typography>
      </Paper>

      <TextField
        select
        label="Filter by Category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        sx={{ borderRadius: 2 }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Sort by"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        fullWidth
        sx={{ borderRadius: 2 }}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {sortedExpenses.length === 0 ? (
          <Typography align="center">No expenses in this category.</Typography>
        ) : (
          sortedExpenses.map((expense, index) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
              onEdit={onEditExpense}
              index={index} // we'll use this to give each card a slight color variety
            />
          ))
        )}
      </Box>
    </Stack>
  );
}

export default ExpenseList;
