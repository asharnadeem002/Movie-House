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
  Rating,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { darkMode } = useTheme();
  const moviesPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch movies
        const moviesRes = await fetch("/api/movies");
        if (!moviesRes.ok) throw new Error("Failed to fetch movies");
        const moviesData = await moviesRes.json();

        // Fetch genres
        const genresRes = await fetch("/api/genres");
        if (!genresRes.ok) throw new Error("Failed to fetch genres");
        const genresData = await genresRes.json();

        setMovies(moviesData);
        setGenres(genresData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter movies based on search query and selected genre
  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "" || movie.genreId === selectedGenre;
    return matchesQuery && matchesGenre;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get genre name by id
  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown";
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Movies
      </Typography>

      <Box
        mb={4}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <TextField
          label="Search Movies"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="genre-filter-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-filter-label"
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}
            label="Filter by Genre"
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>All Genres</em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {filteredMovies.length === 0 ? (
            <Box textAlign="center" my={4}>
              <Typography variant="h6">
                No movies found matching your criteria
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {displayedMovies.map((movie) => (
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
                          <Chip
                            label={getGenreName(movie.genreId)}
                            size="small"
                            color="primary"
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

              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
