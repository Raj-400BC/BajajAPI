
// MAYUR RAJ SINGH
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Hardcoded user ID, email, and roll number
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint for /bfhl route
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid input. Data must be an array.' });
    }

    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        odd_numbers: data.filter(num => num % 2 !== 0 && !isNaN(num)),
        even_numbers: data.filter(num => num % 2 === 0 && !isNaN(num)),
        alphabets: data.filter(item => typeof item === 'string' && item.match(/[a-zA-Z]/)).map(item => item.toUpperCase())
    };

    console.log(response); // Log the response to the console
    res.json(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
