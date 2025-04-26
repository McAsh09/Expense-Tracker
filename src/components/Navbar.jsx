// components/Navbar.js
import React from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

function Navbar({ isDarkMode, toggleDarkMode, activeTab, setActiveTab }) {
  const menuItems = [
    { key: "expenses", label: "Expenses" },
    { key: "reports", label: "Reports" },
    { key: "analytics", label: "Analytics" },
  ];

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 10px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom align="center">
          💸 Tracker
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.key}>
              <ListItemButton
                selected={activeTab === item.key}
                onClick={() => setActiveTab(item.key)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box textAlign="center" mb={2}>
        <IconButton onClick={toggleDarkMode}>
          <Brightness4Icon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Navbar;
