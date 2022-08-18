// Initialisation constants
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Some data
let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
];

// Routers
app.get("/api/movies", (req, res) => { res.json(movies); });
app.get("/api/movies/:id", (req, res) => {
    const movieId = req.params.id;

    const movie = movies.filter(movie => movie.id === movieId)

    if (movie.length > 0) {
        res.json(movie);
    } else {
        res.status(404).end();
    }
});

app.post("/api/movies/", (req, res) => {
    const newMovie = {'id': Date.now(), ...req.body}

    movies = [...movies, newMovie];

    res.json(newMovie);
});

app.delete("/api/movies/:id", (req, res) => {
    const id = req.params.id;

    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end(); // Status 204 -> No Content
});

app.put("/api/movies/:id", (req, res) => {
    const id = req.params.id;
    const updatedMovie = {'id': id, ...req.body};

    const index = movies.findIndex(movie => movie.id === id);
    movies.splice(index, 1, updatedMovie); // Replace updated movie in the array

    res.json(updatedMovie);
});

// Debug message
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});