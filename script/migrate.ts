import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
    process.env;

const schema = `
CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME};
USE ${MYSQL_DB_NAME};

CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    short_description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    long_description TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS shoppCart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
`
const migrate = async () => {
    try {
        const connection = await mysql.createConnection({
            host: MYSQL_DB_HOST,
            user: MYSQL_DB_USER,
            password: MYSQL_DB_PASSWORD,
            multipleStatements: true,
        });

        await connection.query(schema);
        await connection.end();

        console.log("✅ Database seed upload successfully");
    } catch (err) {
        console.error("❌ Error during migration:", err);
    }
};

migrate();