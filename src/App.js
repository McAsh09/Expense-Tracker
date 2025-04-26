import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
  saveExpensesToLocalStorage,
  getExpensesFromLocalStorage,
} from "./utils/localStorage";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = getExpensesFromLocalStorage();
    if (storedExpenses.length > 0) {
      setExpenses(storedExpenses);
    }
  }, []);

  useEffect(() => {
    saveExpensesToLocalStorage(expenses);
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (id, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((exp) => (exp.id === id ? { ...exp, ...updatedExpense } : exp))
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Expense Tracker 💸
      </Typography>

      <Box my={4}>
        <AddExpenseForm onAddExpense={addExpense} />
      </Box>

      <Box my={4}>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={deleteExpense}
          onEditExpense={handleEditExpense}
        />
      </Box>
    </Container>
  );
}

export default App;
