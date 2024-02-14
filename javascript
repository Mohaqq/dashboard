const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let serverStatus = 'OK';
let networkData = [10, 20, 15, 25, 30];

app.use(bodyParser.json());

app.get('/api/server-status', (req, res) => {
    res.json({ status: serverStatus });
});

app.post('/api/server-status', (req, res) => {
    const { status } = req.body;
    
    if (status) {
        serverStatus = status;
        res.json({ message: 'Server status updated successfully' });
    } else {
        res.status(400).json({ error: 'Status is required in the request body' });
    }
});

app.get('/api/network-traffic', (req, res) => {
    res.json({ data: networkData });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
