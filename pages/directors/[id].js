import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  Chip,
  Avatar,
  Rating,
  Button,
  Skeleton,
  Breadcrumbs,
  Link as MuiLink,
  CardActions,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Movie as MovieIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!id) return;

    async function fetchDirector() {
      try {
        const res = await fetch(`/api/directors/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Director not found");
          }
          throw new Error("Failed to fetch director details");
        }
        const data = await res.json();
        setDirector(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching director:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchDirector();
  }, [id]);

  if (error) {
    return (
      <Box textAlign="center" my={4}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/directors")}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Back to Directors
        </Button>
      </Box>
    );
  }

  const getRandomColor = (name) => {
    if (!name) return "#1976d2";
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

  const getInitials = (name) => {
    if (!name) return "D";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/directors"
          underline="hover"
          color="inherit"
        >
          Directors
        </MuiLink>
        <Typography color="text.primary">
          {loading ? "Loading..." : director?.name}
        </Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/directors")}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back to Directors
      </Button>

      {loading ? (
        <>
          <Box display="flex" alignItems="center" mb={3}>
            <Skeleton variant="circular" width={60} height={60} />
            <Box ml={2}>
              <Skeleton variant="text" height={40} width={200} />
              <Skeleton variant="text" width={100} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={120} sx={{ mb: 4 }} />
          <Skeleton variant="text" height={40} />
          <Grid container spacing={3}>
            {Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" width="60%" />
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
        director && (
          <>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: getRandomColor(director.name),
                  mb: { xs: 2, sm: 0 },
                  mr: { xs: 0, sm: 3 },
                }}
              >
                {getInitials(director.name)}
              </Avatar>

              <Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "center", sm: "center" }}
                  mb={1}
                  gap={1}
                >
                  <Typography variant="h4" component="h1">
                    {director.name}
                  </Typography>
                  <Chip
                    icon={<PersonIcon />}
                    label="Director"
                    color="primary"
                    size="small"
                  />
                </Box>

                <Typography variant="body1" paragraph>
                  {director.biography}
                </Typography>

                <Chip
                  label={`${director.movies?.length || 0} Movies Directed`}
                  variant="outlined"
                  icon={<MovieIcon />}
                  size="small"
                />
              </Box>
            </Paper>

            <Typography variant="h5" gutterBottom>
              Filmography
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {!director.movies || director.movies.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body1">
                  No movies found for this director.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {director.movies.map((movie) => (
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
