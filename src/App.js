import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";
import Analytics from "./components/Analytics";
import {
  saveExpensesToLocalStorage,
  getExpensesFromLocalStorage,
} from "./utils/localStorage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("expenses"); // For switching between tabs

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      background: {
        default: isDarkMode ? "#121212" : "#f4f6f8",
        paper: isDarkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
        secondary: isDarkMode ? "#b0b0b0" : "#555555",
      },
    },
    typography: {
      h3: { color: isDarkMode ? "#ffffff" : "#000000" },
    },
  });

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
          },
          html: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
          },
          "#root": {
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
          },
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      />

      {/* Whole Layout */}
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Left Sidebar */}
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: "250px", // Leave space for sidebar
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
                : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            backgroundSize: "400% 400%",
            animation: "gradientMove 15s ease infinite",
            transition: "background 1s ease, color 0.5s ease",
            padding: "40px",
          }}
        >
          <Container maxWidth="md">
            {activeTab === "expenses" && (
              <>
                <Box mb={4}>
                  <Typography variant="h3" align="center" gutterBottom>
                    Add Expenses
                  </Typography>
                </Box>

                <Box mb={4}>
                  <AddExpenseForm onAddExpense={addExpense} />
                </Box>

                <Box mb={4}>
                  <ExpenseList
                    expenses={expenses}
                    onDeleteExpense={deleteExpense}
                    onEditExpense={handleEditExpense}
                  />
                </Box>
              </>
            )}

            {activeTab === "reports" && (
              <Box mb={4}>
                <Typography variant="h3" align="center" gutterBottom>
                  Reports 📊 (Coming soon!)
                </Typography>
              </Box>
            )}

            {activeTab === "analytics" && (
              <Box mb={4}>
                <Analytics expenses={expenses} />
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
