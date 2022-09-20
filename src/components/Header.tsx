import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar className="main-header">
          <Typography variant="h5">CRUD POST</Typography>
          <Box>
            <Link to="/">Home</Link>
            <Link to="posts/add">Add Post</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
