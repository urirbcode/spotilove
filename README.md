# Spotilove

Spotilove is a personal web application project that allows users to collect and share their favorite songs from Spotify. It provides an intuitive interface for users to view the song list, add new songs, and play them directly on Spotify using embedded iframes. The project will be deployed and accessible online in the future.

## How It Works

1. **View Song List**: When a user visits the Spotilove application, they are presented with a list of songs. Each song entry displays the song title, description, and the date it was added. The songs are retrieved from a SQLite database and rendered dynamically on the page.

2. **Add New Songs**: Users can add new songs to the list by clicking on the "Add a song" button. This opens a pop-up form where they can enter the Spotify iframe code, song title, description, and the date the song was added. Upon submitting the form, the song data is sent to the server via an API endpoint and stored in the SQLite database. The song list is then updated in real-time to reflect the newly added song.

3. **Play Songs**: Each song entry in the list includes an embedded Spotify iframe. Users can click on the play button within the iframe to start playing the song directly on Spotify. This allows users to listen to their favorite songs without leaving the Spotilove application.

4. **Database**: The song data is stored in a SQLite database. The application uses SQLite to persist the song information, including the title, description, added date, and the Spotify iframe code. The database is accessed through an Express.js backend API.

5. **API Endpoints**: The application exposes API endpoints for retrieving the list of songs, adding new songs, updating song information, and deleting songs. These endpoints are defined in the `routes/songRoutes.js` file and handled by the functions in the `helpers/songsController.js` file.

## Features

- Display a list of songs with their titles, descriptions, and added dates
- Add new songs to the list using a pop-up form
- Play songs directly on Spotify using embedded iframes
- Store song data in a SQLite database
- RESTful API for song management

## Technologies Used

- HTML, CSS, JavaScript for the frontend
- Node.js and Express.js for the backend
- SQLite for the database
- Axios for making HTTP requests
- Spotify iframes for playing songs

## Project Structure

- `public/`: Contains the static files (CSS, fonts, images)
- `views/`: Contains the HTML files
- `index.html`: The main page of the application
- `routes/`: Contains the route definitions
- `songRoutes.js`: Defines the API routes for songs
- `models/`: Contains the database models and connection
- `db.js`: Establishes the connection to the SQLite database
- `helpers/`: Contains helper functions
- `songsController.js`: Implements the CRUD operations for songs
- `server.js`: The main server file that sets up the Express application and routes
- `package.json`: Contains the project dependencies and scripts

## Contributing

As this is a personal project, contributions are not currently accepted. However, if you have any suggestions or feedback, feel free to reach out to me.


## Acknowledgements

- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font by Google Fonts
- [Spotify](https://www.spotify.com/) for providing the music platform and iframes