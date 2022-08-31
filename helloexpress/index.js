const express = require('express');
const app = express();

const port = 3000;

app.get("/home/user/:name/:age", (req, res) => {
    if (req.params.age >= 18) {
        res.send(`Hello ${req.params.name}, you're ${req.params.age} years old`)
    } else {
        res.send(`Hello ${req.params.name}, you're too young`)
    }
})

// Another route in this website
app.get("/about", (req, res) => {
    res.send("<h1>About us...</h1>");
})

// A debug message to console, telling that everything works
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
