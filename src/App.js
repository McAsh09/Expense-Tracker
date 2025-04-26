import React, { useState, useEffect } from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
  saveExpensesToLocalStorage,
  getExpensesFromLocalStorage,
} from "./utils/localStorage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { CssBaseline, GlobalStyles } from "@mui/material";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

  // Get the stored theme preference from local storage (optional)
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save the current theme preference to local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Create themes for light and dark modes
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light", // Switch theme based on isDarkMode state
      primary: {
        main: "#1976d2",
      },
      background: {
        default: isDarkMode ? "#121212" : "#f4f6f8", // Ensure background changes to dark mode
        paper: isDarkMode ? "#1e1e1e" : "#ffffff", // Paper background color
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000", // Primary text color
        secondary: isDarkMode ? "#b0b0b0" : "#555555", // Secondary text color
      },
    },
    typography: {
      h3: {
        color: isDarkMode ? "#ffffff" : "#000000", // Heading color changes based on mode
      },
    },
  });

  // Load expenses from local storage
  useEffect(() => {
    const storedExpenses = getExpensesFromLocalStorage();
    if (storedExpenses.length > 0) {
      setExpenses(storedExpenses);
    }
  }, []);

  // Save expenses to local storage when they change
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
      prevExpenses.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExpense } : exp
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
          html: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
          },
          "#root": {
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          padding: 0,
          margin: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
              : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          animation: "gradientMove 15s ease infinite",
          transition: "background 1s ease, color 0.5s ease",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          color: theme.palette.text.primary,
    
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Expense Tracker 💸
          </Typography>

          <Box my={4} display="flex" justifyContent="flex-end">
            {/* Dark Mode Toggle Button */}
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
              <Brightness4Icon />
            </IconButton>
          </Box>

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
      </Box>
    </ThemeProvider>
  );
}

export default App;
