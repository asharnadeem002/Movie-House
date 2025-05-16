import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Movie as MovieIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

export default function Help() {
  const { darkMode } = useTheme();

  const faqs = [
    {
      question: "How do I search for movies?",
      answer:
        "You can search for movies on the Movies page using the search bar at the top. Type in the title of the movie you are looking for, and the results will update automatically.",
    },
    {
      question: "How do I filter movies by genre?",
      answer:
        "On the Movies page, use the genre dropdown to select a specific genre. The movie list will update to show only movies from that genre.",
    },
    {
      question: "How does the dark mode work?",
      answer:
        "You can toggle between light and dark modes by clicking the moon/sun icon in the top navigation bar. Your preference will be saved for your next visit.",
    },
    {
      question: "How can I see all movies by a specific director?",
      answer:
        'Visit the Directors page, find the director you are interested in, and click on "View Profile". This will take you to the director\'s page showing all their movies.',
    },
    {
      question: "Are the movie ratings based on a 5-star or 10-point scale?",
      answer:
        "Our ratings are displayed using a 5-star system, but they are based on a 10-point scale. For example, a movie with a rating of 7.5/10 will show as 3.75 stars.",
    },
  ];

  const features = [
    {
      name: "Browse Movies",
      description:
        "View all movies with details including title, release year, rating, and description.",
      icon: <MovieIcon />,
    },
    {
      name: "Explore Genres",
      description:
        "Browse movies by genre to find exactly what you're looking for.",
      icon: <CategoryIcon />,
    },
    {
      name: "Discover Directors",
      description:
        "Learn about directors and see all the movies they've directed.",
      icon: <PersonIcon />,
    },
    {
      name: "Dark Mode",
      description:
        "Toggle between light and dark mode for comfortable viewing in any environment.",
      icon: <DarkModeIcon />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Help & Support
      </Typography>

      <Paper elevation={darkMode ? 2 : 1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to Movie House
        </Typography>
        <Typography variant="body1">
          Movie House is a web application that allows you to explore movies,
          directors, and genres. This help page provides information on how to
          use the application and answers common questions.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Key Features
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List>
        {features.map((feature, index) => (
          <Paper key={index} elevation={0} variant="outlined" sx={{ mb: 2 }}>
            <ListItem>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">{feature.name}</Typography>}
                secondary={feature.description}
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Frequently Asked Questions
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Box display="flex" alignItems="center">
              <HelpIcon
                fontSize="small"
                sx={{ mr: 1, color: "primary.main" }}
              />
              <Typography variant="subtitle1">{faq.question}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
