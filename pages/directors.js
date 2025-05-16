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
  TextField,
  InputAdornment,
  Skeleton,
  Avatar,
  Divider,
  Chip,
  CardHeader,
} from "@mui/material";
import { Search as SearchIcon, Movie as MovieIcon } from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const res = await fetch("/api/directors");
        if (!res.ok) throw new Error("Failed to fetch directors");
        const data = await res.json();
        setDirectors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching directors:", error);
        setLoading(false);
      }
    }

    fetchDirectors();
  }, []);

  // Filter directors based on search query
  const filteredDirectors = directors.filter((director) =>
    director.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to get random color for avatar
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

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Directors
      </Typography>

      <Box mb={4}>
        <TextField
          label="Search Directors"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(5)).map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box ml={2} width="80%">
                      <Skeleton variant="text" width="60%" height={30} />
                    </Box>
                  </Box>
                  <Skeleton variant="rectangular" height={80} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {filteredDirectors.length === 0 ? (
            <Box textAlign="center" my={4}>
              <Typography variant="h6">
                No directors found matching your search
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredDirectors.map((director) => (
                <Grid item xs={12} md={6} key={director.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: darkMode
                          ? "0 8px 16px rgba(0,0,0,0.4)"
                          : "0 8px 16px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: getRandomColor(director.name) }}
                          aria-label={director.name}
                        >
                          {getInitials(director.name)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h2">
                          {director.name}
                        </Typography>
                      }
                      action={
                        <Chip
                          icon={<MovieIcon fontSize="small" />}
                          label="Director"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                      >
                        {director.biography?.substring(0, 150)}
                        {director.biography?.length > 150 ? "..." : ""}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => router.push(`/directors/${director.id}`)}
                      >
                        View Profile
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}
