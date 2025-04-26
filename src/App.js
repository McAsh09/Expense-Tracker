import React, { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, { ...expense, id: uuidv4() }]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedExpense } : item
      )
    );
  };

  const total = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #9ac0ff 0%, #fad0c4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // py: 5,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #ce9aff 0%, #c4faf2 100%)",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                color: "#6a1b9a",
                fontWeight: "bold",
                fontFamily: "'Pacifico', cursive",
              }}
            >
              💸Expense Tracker
            </Typography>

            <ExpenseForm onAdd={addExpense} />

            <Box mt={3}>
              <ExpenseList
                expenses={expenses}
                onDelete={deleteExpense}
                onEdit={editExpense}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{
                mt: 5,
                textAlign: "center",
                background: "linear-gradient(90deg, #FFD700, #FFA500, #FFB700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1rem",
                letterSpacing: "1px",
                textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                fontFamily: '"Josefin Sans", sans-serif',
                fontOpticalSizing: 'auto',
                fontWeight: 400,
                fontStyle: 'normal',
              }}
            >
              Total Spent: ₹{total.toFixed(2)}
            </Typography>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
}

export default App;
