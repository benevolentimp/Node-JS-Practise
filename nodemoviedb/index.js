// Import libraries:
const express = require('express');
const bodyParser = require('body-parser');

const query = require('./db/movies');
const auth = require('./services/authenticate');

const app = express();
app.use(bodyParser.json());

const port = 3000;

process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

// Routes
app.get('/api/movies', query.getAllMovies);
app.get('/api/movies/:id', query.getMovieById);
app.post('/api/movies', query.addMovie);
app.delete('/api/movies/:id', query.deleteMovie);
app.put('/api/movies/:id', query.updateMovie);

// Authentication routes
app.post("/login", auth.login);

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

module.exports = app;