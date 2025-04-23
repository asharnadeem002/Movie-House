Movie House
Overview
Movie House is a web application built with Next.js that allows users to browse, search, and view details about movies, genres, and directors. The application uses a JSON file (data.json) as its data source and implements various Next.js features, including static site generation (SSG), server-side rendering (SSR), client-side rendering (CSR) with useSWR, dynamic routes, and catch-all routes. The UI is styled with Tailwind CSS for a modern, responsive design.
Features

Home Page: Displays trending movies with navigation to all movies and genres.
Movies Page: Lists all movies with genre filtering and links to individual movie details.
Movie Details: Shows movie information with a nested route for director details.
Genres Page: Lists genres and allows filtering movies by genre (SSR).
Directors Page: Displays director details and their movies (CSR with useSWR).
Help Pages: Includes a base help page and dynamic sections (FAQs, Contact, Privacy) via catch-all routes.
Custom 404 Page: User-friendly error page with a link to the home page.

Prerequisites

Node.js (v16 or higher)
npm or yarn

Setup Instructions

Clone the Repository (if applicable):
git clone <https://github.com/asharnadeem002/Movie-House.git>
cd movie-house


Install Dependencies:
npm install

This installs Next.js, swr (for CSR), and other dependencies listed in package.json.

Ensure data.json is Present:

Place the data.json file in the root directory of the project. This file contains the movie, genre, and director data.


Add Tailwind CSS (if not already configured):

Ensure Tailwind CSS is set up by including the following in styles/globals.css:@tailwind base;
@tailwind components;
@tailwind utilities;


Verify that tailwind.config.js includes:module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}





How to Run the Project

Development Mode:
npm run dev


This starts the development server at http://localhost:3000.
Open your browser and navigate to http://localhost:3000 to view the application.


Production Build:
npm run build


This generates an optimized production build in the .next directory.


Start Production Server:
npm run start


This runs the production build, typically at http://localhost:3000.



Project Structure
movie-house/
├── data.json              # Movie, genre, and director data
├── pages/                 # Next.js pages
│   ├── api/               # API routes for data fetching
│   ├── movies/            # Dynamic and nested movie routes
│   ├── genres/            # Genre-related pages
│   ├── help/              # Help pages with catch-all routes
│   ├── 404.js             # Custom 404 page
│   ├── directors.js       # Directors page (CSR)
│   ├── genres.js          # Genres page (SSR)
│   ├── index.js           # Home page
│   └── movies.js          # Movies page
├── styles/                # CSS styles
│   └── globals.css        # Global styles with Tailwind CSS
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies and scripts

Notes

The application uses Incremental Static Regeneration (ISR) with a revalidation period of 60 seconds for static pages.
Ensure the data.json file is correctly formatted and placed in the root directory to avoid runtime errors.
For production deployment, consider hosting on platforms like Vercel, which is optimized for Next.js applications.

