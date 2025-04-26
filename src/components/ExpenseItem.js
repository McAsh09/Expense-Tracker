import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Stack,
  Box
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

function ExpenseItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(item.desc);
  const [amount, setAmount] = useState(item.amount);

  const handleSave = () => {
    onEdit(item.id, { desc, amount });
    setIsEditing(false);
  };

  return (
    <ListItem
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        mb: 1,
        px: 2
      }}
      secondaryAction={
        isEditing ? (
          <IconButton edge="end" onClick={handleSave}>
            <Save />
          </IconButton>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButton edge="end" onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={onDelete}>
              <Delete />
            </IconButton>
          </Stack>
        )
      }
    >
      {isEditing ? (
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
            />
            <TextField
              variant="standard"
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              sx={{ width: 100 }}
            />
          </Stack>
        </Box>
      ) : (
        <ListItemText primary={`${item.desc} - ₹${item.amount}`} />
      )}
    </ListItem>
  );
}

export default ExpenseItem;
