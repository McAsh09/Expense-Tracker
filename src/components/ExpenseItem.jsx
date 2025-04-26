import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  TextField,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

function ExpenseItem({ expense, onDelete, onEdit, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    title: expense.title,
    amount: expense.amount,
    date: expense.date,
    category: expense.category,
  });

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Define some premium colors
  const lightColors = ["#ffffff", "#f0f4ff", "#f7f9fc"];
  const darkColors = ["#1f2a40", "#2c3e50", "#34495e"];

  const cardColor = isDark
    ? darkColors[index % darkColors.length]
    : lightColors[index % lightColors.length];

  const handleSave = () => {
    onEdit(expense.id, editedExpense);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: cardColor,
          boxShadow: 6,
          borderRadius: 3,
          transition: "0.3s ease-in-out",
          ":hover": { boxShadow: 12 },
          border: "1px solid #e0e0e0",
          width: 250,
        }}
      >
        <CardContent>
          {isEditing ? (
            <Stack spacing={2}>
              {/* Textfields inside editing mode */}
              <TextField
                label="Title"
                value={editedExpense.title}
                onChange={(e) =>
                  setEditedExpense({ ...editedExpense, title: e.target.value })
                }
                fullWidth
                size="small"
                variant="outlined"
                sx={{ bgcolor: "#f9f9f9" }}
              />
              <TextField
                label="Amount"
                value={editedExpense.amount}
                type="number"
                onChange={(e) =>
                  setEditedExpense({ ...editedExpense, amount: e.target.value })
                }
                fullWidth
                size="small"
                variant="outlined"
                sx={{ bgcolor: "#f9f9f9" }}
              />
              <TextField
                label="Date"
                value={
                  editedExpense.date ? editedExpense.date.slice(0, 10) : ""
                }
                type="date"
                onChange={(e) =>
                  setEditedExpense({ ...editedExpense, date: e.target.value })
                }
                fullWidth
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: "#f9f9f9" }}
              />
              <TextField
                label="Category"
                value={editedExpense.category}
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    category: e.target.value,
                  })
                }
                fullWidth
                size="small"
                variant="outlined"
                sx={{ bgcolor: "#f9f9f9" }}
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ borderRadius: 2 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  sx={{ borderRadius: 2 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ₹{Number(expense.amount).toFixed(2)}
                </Typography>
                <Typography color="textSecondary">{expense.title}</Typography>
                <Typography color="textSecondary">
                  {expense.date
                    ? new Date(expense.date).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ExpenseItem;
