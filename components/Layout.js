import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  CssBaseline,
  Paper,
} from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  Category as GenreIcon,
  Person as DirectorIcon,
  Help as HelpIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const menuItems = [
  { text: "Home", href: "/", icon: <HomeIcon /> },
  { text: "Movies", href: "/movies", icon: <MovieIcon /> },
  { text: "Genres", href: "/genres", icon: <GenreIcon /> },
  { text: "Directors", href: "/directors", icon: <DirectorIcon /> },
  { text: "Help", href: "/help", icon: <HelpIcon /> },
];

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie House
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  sx={{
                    fontWeight:
                      router.pathname === item.href ? "bold" : "normal",
                    borderBottom:
                      router.pathname === item.href
                        ? "2px solid white"
                        : "none",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.href}
                component={Link}
                href={item.href}
                selected={router.pathname === item.href}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {router.pathname === item.href && <ChevronRightIcon />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container component="main" sx={{ pt: 3, pb: 6 }}>
        <Paper elevation={darkMode ? 3 : 1} sx={{ p: 3, mt: 2 }}>
          {children}
        </Paper>
      </Container>
    </>
  );
}
