import React from "react";
import { List, Typography, Box } from "@mui/material";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          textAlign: "center",
          color: "#388e3c",
          fontSize: "1.1rem",
          fontWeight: "bold",
          fontFamily: '"Josefin Sans", sans-serif',
          fontOpticalSizing: 'auto',
          fontWeight: 400, // or whatever weight you want (100–700)
          fontStyle: 'normal',
        }}
      >
        Good going, no expenses yet! 😄
      </Typography>
    );
  }

  return (
    <List sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      {expenses.map((exp) => (
        <Box
          key={exp.id}
          sx={{
            p: 1.5,
            borderRadius: 2,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.01)",
            },
          }}
        >
          <ExpenseItem
            item={exp}
            onDelete={() => onDelete(exp.id)}
            onEdit={onEdit}
          />
        </Box>
      ))}
    </List>
  );
}

export default ExpenseList;
