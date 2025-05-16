import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Skeleton,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Avatar,
} from "@mui/material";
import {
  Category as CategoryIcon,
  KeyboardArrowRight as ArrowIcon,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("/api/genres");
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenres(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  // Function to get random color for genre
  const getRandomColor = (name) => {
    const colors = [
      "#1976d2",
      "#dc004e",
      "#9c27b0",
      "#ff9800",
      "#2e7d32",
      "#d32f2f",
      "#0097a7",
      "#303f9f",
      "#c2185b",
      "#fbc02d",
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Genres
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Explore movies by genre
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper variant="outlined">
                <Box p={2}>
                  <Skeleton variant="text" height={40} width="60%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Box mt={1}>
                    <Skeleton variant="rectangular" height={40} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
          {genres.map((genre) => (
            <Paper
              key={genre.id}
              elevation={1}
              sx={{
                mb: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: darkMode
                    ? "0 4px 8px rgba(0,0,0,0.4)"
                    : "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/genres/${genre.id}/movies`)}
                    endIcon={<ArrowIcon />}
                  >
                    View Movies
                  </Button>
                }
              >
                <ListItemButton
                  onClick={() => router.push(`/genres/${genre.id}/movies`)}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: getRandomColor(genre.name),
                        width: 32,
                        height: 32,
                      }}
                    >
                      <CategoryIcon fontSize="small" />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        {genre.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
