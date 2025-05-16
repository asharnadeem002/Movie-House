import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Rating,
  Skeleton,
  Breadcrumbs,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Link from "next/link";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMovie() {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Movie not found");
          }
          throw new Error("Failed to fetch movie details");
        }
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (error) {
    return (
      <Box textAlign="center" my={4}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/movies")}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Back to Movies
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
          href="/movies"
          underline="hover"
          color="inherit"
        >
          Movies
        </MuiLink>
        <Typography color="text.primary">
          {loading ? "Loading..." : movie?.title}
        </Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {loading ? (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Skeleton variant="text" height={60} width="60%" />
            <Box display="flex" alignItems="center" mb={2}>
              <Skeleton variant="text" width={100} />
              <Box sx={{ ml: 2 }}>
                <Skeleton variant="text" width={120} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={100} />
            <Box mt={2}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </CardContent>
        </Card>
      ) : (
        movie && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {movie.title} ({movie.releaseYear})
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    mb={3}
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Chip
                      label={movie.genreName}
                      color="primary"
                      variant="outlined"
                    />
                    <Box display="flex" alignItems="center">
                      <Rating
                        value={movie.rating / 2}
                        precision={0.5}
                        readOnly
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {movie.rating}/10
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" paragraph>
                    {movie.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Director:
                  </Typography>
                  <Typography
                    variant="body1"
                    component={Link}
                    href={`/directors/${movie.directorId}`}
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {movie.directorName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
}
