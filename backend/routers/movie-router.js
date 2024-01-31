const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// function to read JSON files
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data); //return json data from file
    } catch (error) {
        throw error;
    }
};

app.get('/current-movies/:lang/:id', async (req, res) => { //GET request for any one of the "current" movies
    const lang = req.params.lang;
    const movieId = req.params.id;

    const filePath = path.join(__dirname, `../movies/current/current-${lang}.json`); // Assuming languages are 'en' and 'gr'
    try {
        const dataJSON = await readJsonFile(filePath); 
        const movie = dataJSON.current_movies.find(entry => entry.id == movieId); //finds the movie with the specific id

        if (movie) { //movie is found
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/coming-soon-movies/:lang/:id', async (req, res) => { //GET request for any one of the "coming soon" movies
    const lang = req.params.lang;
    const movieId = req.params.id;

    const filePath = path.join(__dirname, `../movies/coming-soon/coming-soon-${lang}.json`); // Assuming languages are 'en' and 'gr'

    try {
        const dataJSON = await readJsonFile(filePath);
        const movie = dataJSON.coming_soon_movies.find(entry => entry.id == movieId); //finds the movie with the specific id

        if (movie) { //movie is found
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
