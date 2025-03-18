import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',   // XAMPP MySQL host
    port: 3307,
    user: 'root',        // Default MySQL user
    password: '',        // No password for root (leave empty)
    database: 'mesamate', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

export default pool;
