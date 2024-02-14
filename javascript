const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample data representing server status
let serverStatus = 'OK';

// Middleware to parse JSON data
app.use(bodyParser.json());

// API to get server status
app.get('/api/server-status', (req, res) => {
    res.json({ status: serverStatus });
});

// API to update server status
app.post('/api/server-status', (req, res) => {
    const { status } = req.body;
    
    if (status) {
        serverStatus = status;
        res.json({ message: 'Server status updated successfully' });
    } else {
        res.status(400).json({ error: 'Status is required in the request body' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
