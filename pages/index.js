import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Rating,
  Skeleton,
} from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <Box>
      <Box textAlign="center" my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Movie House
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Discover and explore a wide range of movies
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Trending Movies
        </Typography>
        <Grid container spacing={3}>
          {loading
            ? // Loading skeletons
              Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Skeleton variant="text" width="80%" height={40} />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="rectangular" height={60} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : // Actual movie cards
              movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: darkMode
                          ? "0 8px 16px rgba(0,0,0,0.4)"
                          : "0 8px 16px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {movie.releaseYear}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Rating
                          value={movie.rating / 2}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" ml={1}>
                          {movie.rating}/10
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {movie.description?.substring(0, 100)}
                        {movie.description?.length > 100 ? "..." : ""}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => router.push(`/movies/${movie.id}`)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/movies")}
        >
          View All Movies
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push("/genres")}
        >
          Browse Genres
        </Button>
      </Box>
    </Box>
  );
}
