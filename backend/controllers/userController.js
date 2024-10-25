const { getConnection } = require('../config/database');

const getUserProfile = (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error' });
        }

        const query = 'SELECT name, email, user_type FROM users WHERE id = ?';
        connection.query(query, [userId], (error, results) => {
            connection.release();

            if (error || results.length === 0) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.status(200).json(results[0]);
        });
    });
};

const updateUserProfile = (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!userId || !name || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error' });
        }

        const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        connection.query(query, [name, email, userId], (error, results) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: 'Error updating user profile.' });
            }

            res.status(200).json({ message: 'User profile updated successfully.' });
        });
    });
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
