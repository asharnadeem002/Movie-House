# Movie House

A modern web application for exploring movies, directors, and genres using Next.js and MySQL.

## Features

- Browse movies with detailed information
- Filter movies by genre
- Search for movies by title
- Explore directors and their filmographies
- Sort and filter by different criteria
- Dark/Light mode theme toggle with persistence
- Responsive UI using Material UI components

## Technical Stack

- **Frontend**: Next.js, React, Material UI
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **State Management**: React Context API
- **Styling**: Material UI and CSS

## Prerequisites

- Node.js (v14+ recommended)
- MySQL Server installed and running
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd movie-house
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL Database

Ensure MySQL is running on your system. The application is configured to connect to MySQL with the following default credentials:

- Host: localhost
- Port: 3306
- Username: root
- Password: Password123
- Database: moviehouse

You can customize these settings by creating a `.env.local` file in the root directory with the following content:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=Password123
MYSQL_DATABASE=moviehouse
```

### 4. Fix MySQL Authentication (for MySQL 8+)

If you're using MySQL 8 or later, you may need to update the authentication method:

```bash
npm run fix-auth
```

This will alter the MySQL user to use a compatible authentication method (mysql_native_password).

Alternatively, run this SQL command directly in your MySQL client:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password123';
FLUSH PRIVILEGES;
```

### 5. Set up the database

Run the setup script to create the database and import data:

```bash
npm run setup-db
```

This will:
- Create the database if it doesn't exist
- Create the required tables
- Import sample data from `data.json`

You can verify the database setup by running:

```bash
npm run verify-db
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Troubleshooting

### MySQL Authentication Error

If you see an error like:
```
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server
```

This means your MySQL server is using a newer authentication method not supported by the Node.js client. Run:

```bash
npm run fix-auth
```

### Connection Issues

If you still face connection issues:

1. Make sure MySQL is running
2. Verify your credentials are correct
3. Try connecting to MySQL manually to ensure it's working:
   ```
   mysql -u root -pAlmariAlmari5
   ```
4. Check if the `moviehouse` database exists:
   ```
   SHOW DATABASES;
   ```

## Project Structure

- `pages/` - Next.js pages and API routes
  - `api/` - API routes for backend functionality
    - `movies/` - Movie-related endpoints
    - `directors/` - Director-related endpoints
    - `genres/` - Genre-related endpoints
  - Various pages for the UI
- `components/` - Reusable React components
- `contexts/` - React Context API providers
- `lib/` - Utility functions
  - `db.js` - Database connection
  - `setupDb.js` - Database setup functions
- `public/` - Static assets
- `styles/` - Global styles
- `scripts/` - Utility scripts for database setup and verification

## API Routes

- `GET /api/movies` - Get all movies
- `GET /api/movies/[id]` - Get a specific movie by ID
- `GET /api/directors` - Get all directors
- `GET /api/directors/[id]` - Get a specific director and their movies
- `GET /api/genres` - Get all genres
- `GET /api/genres/[id]/movies` - Get movies by genre ID

## Theme Context

The application uses React Context API for global theme management. Users can toggle between dark and light modes, and their preference is stored in localStorage for persistence.

## Acknowledgements

This project was created as part of the Advanced Programming course assignment.

