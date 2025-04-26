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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

function ExpenseItem({ expense, onDelete, onEdit }) {
  const { id, title, amount, date, category } = expense;

  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    title: expense.title,
    amount: expense.amount,
    date: expense.date,
    category: expense.category,
  });

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
          bgcolor: "#ffffff",
          boxShadow: 6,
          borderRadius: 2,
          transition: "0.3s ease-in-out",
          ":hover": { boxShadow: 12 },
          border: "1px solid #e0e0e0",
        }}
      >
        <CardContent>
          {isEditing ? (
            <Stack spacing={2}>
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
                value={editedExpense.date ? editedExpense.date.slice(0, 10) : ""}
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
                  sx={{
                    ":hover": {
                      backgroundColor: "#1976d2",
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  sx={{
                    ":hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
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
                <Typography variant="body2" color="text.secondary">
                  {expense.title}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {expense.date ? new Date(expense.date).toLocaleDateString() : new Date().toLocaleDateString() }
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mt: 1, fontWeight: "bold", color: "#1976d2" }}
                >
                  {expense.category}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    ":hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(expense.id)}
                  sx={{
                    ":hover": {
                      backgroundColor: "#ffcdd2",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ExpenseItem;
