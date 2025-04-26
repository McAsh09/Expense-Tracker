import React, { useState } from "react";
import { TextField, Button, MenuItem, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

function AddExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newExpense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      category,
      createdAt: new Date().toISOString(),
    };

    onAddExpense(newExpense);

    // Clear form
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </Stack>
    </form>
  );
}

export default AddExpenseForm;
