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
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  Rating,
  Paper,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "../../../contexts/ThemeContext";

export default function GenreMovies() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!id) return;

    async function fetchMoviesByGenre() {
      try {
        const res = await fetch(`/api/genres/${id}/movies`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Genre not found");
          }
          throw new Error("Failed to fetch movies for this genre");
        }
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchMoviesByGenre();
  }, [id]);

  if (error) {
    return (
      <Box textAlign="center" my={4}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/genres")}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Back to Genres
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/genres"
          underline="hover"
          color="inherit"
        >
          Genres
        </MuiLink>
        <Typography color="text.primary">
          {loading ? "Loading..." : data?.genre.name}
        </Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/genres")}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back to Genres
      </Button>

      {loading ? (
        <>
          <Skeleton variant="text" height={60} width="60%" />
          <Skeleton variant="text" height={30} width="40%" sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton
                      variant="rectangular"
                      height={60}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        data && (
          <>
            <Box mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                {data.genre.name} Movies
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.movies.length}{" "}
                {data.movies.length === 1 ? "movie" : "movies"} found
              </Typography>
            </Box>

            {data.movies.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body1">
                  No movies found in this genre. Check back later!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {data.movies.map((movie) => (
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
                        <Typography variant="h6" component="h2" gutterBottom>
                          {movie.title}
                        </Typography>

                        <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                          <Chip
                            label={movie.releaseYear}
                            size="small"
                            variant="outlined"
                          />
                          {movie.directorName && (
                            <Chip
                              label={movie.directorName}
                              size="small"
                              color="secondary"
                              variant="outlined"
                            />
                          )}
                        </Box>

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
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )
      )}
    </Box>
  );
}
