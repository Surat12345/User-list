import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Users", path: "/users" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* App Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" }
            }}
          >
            User CRUD App
          </Typography>

          {/* Desktop / Tablet Menu */}
          {!isMobile && (
            <Box>
              {menuItems.map(item => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: "white",
                    mx: 1,
                    "&.active": {
                      borderBottom: "2px solid white",
                      borderRadius: 0
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: "70vw", maxWidth: 300 }}>
          <List>
            {menuItems.map(item => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  sx={{
                    "&.active": {
                      backgroundColor: "action.selected"
                    }
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

