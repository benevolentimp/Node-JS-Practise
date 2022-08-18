const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const port = 3000;

// data:
let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
  ]

// routers:
app.get('/api/customers', (req, res) => { res.json(customers) }); // Fetch all customers
app.get('/api/customers/:id', (req, res) => { 
    const customerId = req.params.id; // Fetch customer by id

    const customer = customers.filter(customer => customer.id === customerId); // Filter array for matching id to request

    // Check that customer exists (otherwise throw 404 -> Not found)
    if (customer.length > 0) {
        res.json(customer);
    } else {
        res.status(404).end();
    }
});

app.post('/api/customers', (req, res) => {
    const newCustomer = {'id': Date.now(), ...req.body}; // Creating id, then rest is given in the request (body-parser parsing it)

    customers = [...customers, newCustomer];

    res.json(newCustomer);
});

app.delete('/api/customers/:id', (req, res) => {
    const id =  req.params.id;

    customers = customers.filter(customer => customer.id !== id);
    res.status(204).end();
});

app.put('/api/customers/:id', (req, res) => {
    const id =  req.params.id;
    const updatedCustomer = {'id': id, ...req.body};

    const index = customers.findIndex(customer => customer.id === id);
    customers.splice(index, 1, updatedCustomer);

    res.json(updatedCustomer);
});

// debug:
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
