// Define MySQL connection parameters
const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'uk29',
    password: process.env.password,
    database: 'omniportOrders'
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
module.exports=db