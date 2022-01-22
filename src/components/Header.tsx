import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRUD POST
            </Typography>
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="posts/add">
              <Button color="inherit">Add Post</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
