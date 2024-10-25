const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/database');

const registerUser = (req, res) => {
    const { name, email, password, user_type } = req.body;

    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); 

    getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error' });
        }

        const query = 'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)';
        connection.query(query, [name, email, hashedPassword, user_type], (error, results) => {
            connection.release();

            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already registered.' });
                }
                return res.status(500).json({ message: 'Error registering user.' });
            }

            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error' });
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results) => {
            connection.release();

            if (error || results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const user = results[0];

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { id: user.id, name: user.name, email: user.email, user_type: user.user_type },
            });
        });
    });
};


module.exports = {
    registerUser,
    loginUser,
};
