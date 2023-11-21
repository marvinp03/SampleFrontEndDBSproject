//server.js

const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // This line is important to handle JSON payloads

const path = require('path');


// Serve static files from the 'public' directory
app.use(express.static('public'));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Flygon=03",
    database: "yt_enterprise_dump"
});

/*
// Create an endpoint to get all customers
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM yt_enterprise_dump.customer', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
*/


// insert customer
app.post('/customers', (req, res) => {
    const { ID, Name, Email, Address } = req.body;
    const query = 'INSERT INTO customer (ID, Name, Email, Address) VALUES (?, ?, ?, ?)';

    pool.query(query, [ID, Name, Email, Address], (err, results) => {

        // give error if there is given ID is already taken
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'ID taken'});
        } else {
            res.status(500).json({ error: 'Internal server error', details: err });
        }
        return;
        
    });
});




// Create an endpoint to get a specific customer by ID
app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('SELECT * FROM yt_enterprise_dump.customer WHERE ID = ? ', [customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


// Create a new customer
app.post('/customers', (req, res) => {
    const { Name, Email, Address } = req.body;
    pool.query('INSERT INTO yt_enterprise_dump.customer (Name, Email, Address) VALUES (?, ?, ?)', [Name, Email, Address], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


// Update a customer
app.put('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const { Name, Email, Address } = req.body;
    pool.query('UPDATE yt_enterprise_dump.customer SET Name = ?, Email = ?, Address = ? WHERE ID = ?', [Name, Email, Address, customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


// Delete a customer
app.delete('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('DELETE FROM yt_enterprise_dump.customer WHERE ID = ?', [customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});







// Create a new shirt
app.post('/shirt', (req, res) => {
    const { Size, Color, Deadline, DesignPercentage } = req.body;
    pool.query('INSERT INTO yt_enterprise_dump.shirt (Size, Color, Deadline, DesignPercentage) VALUES (?, ?, ?, ?)', [Size, Color, Deadline, DesignPercentage], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Get all shirts
app.get('/shirt', (req, res) => {
    pool.query('SELECT * FROM yt_enterprise_dump.shirt', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Get a specific shirt by ID
app.get('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    pool.query('SELECT * FROM yt_enterprise_dump.shirt WHERE ShirtID = ?', [shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Update a shirt
app.put('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    const { Size, Color, Deadline, DesignPercentage } = req.body;
    pool.query('UPDATE yt_enterprise_dump.shirt SET Size = ?, Color = ?, Deadline = ?, DesignPercentage = ? WHERE ShirtID = ?', [Size, Color, Deadline, DesignPercentage, shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Delete a shirt
app.delete('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    pool.query('DELETE FROM yt_enterprise_dump.shirt WHERE ShirtID = ?', [shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
















// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public' , 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



