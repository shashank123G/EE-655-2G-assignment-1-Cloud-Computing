const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const app = express();
app.use(bodyParser.json());

// Create a new product
app.post('/products', (req, res) => {
    let data = { name: req.body.name, price: req.body.price, quantity: req.body.quantity };
    let sql = 'INSERT INTO products SET ?';
    db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send('Product added successfully');
    });
});

// Retrieve all products
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Retrieve a single product
app.get('/products/:id', (req, res) => {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update a product
app.put('/products/:id', (req, res) => {
    let sql = `UPDATE products SET name = '${req.body.name}', price = ${req.body.price}, quantity = ${req.body.quantity} WHERE id = ${req.params.id}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('Product updated successfully');
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Product deleted successfully');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
