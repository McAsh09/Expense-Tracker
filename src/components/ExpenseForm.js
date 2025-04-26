import React, { useState } from 'react';
import { TextField, Button, Stack, Paper, Typography } from '@mui/material';

function ExpenseForm({ onAdd }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    onAdd({ desc, amount });
    setDesc('');
    setAmount('');
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 5,
        background: 'linear-gradient(135deg, #f8f9fa, #e0eafc)',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: "'Pacifico', cursive",
          color: '#6a1b9a',
          letterSpacing: 1,
        }}
      >
        ✍️ Add a New Expense
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="What did you shop now?"
            variant="outlined"
            fullWidth
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover fieldset': {
                  borderColor: '#7e57c2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6a1b9a',
                },
              },
            }}
          />
          <TextField
            label="Amount (₹)"
            variant="outlined"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover fieldset': {
                  borderColor: '#7e57c2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6a1b9a',
                },
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #7b1fa2, #9c27b0)',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 3,
              transition: 'background 0.3s',
              '&:hover': {
                background: 'linear-gradient(45deg, #6a1b9a, #8e24aa)',
              },
            }}
          >
            ➕ Add Expense
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default ExpenseForm;
