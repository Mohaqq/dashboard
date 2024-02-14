const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (assuming MongoDB is running on default port 27017)
mongoose.connect('mongodb://localhost:27017/dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model
const metricSchema = new mongoose.Schema({
    name: String,
    status: String,
});

const Metric = mongoose.model('Metric', metricSchema);

app.use(bodyParser.json());

// API to get all metrics
app.get('/api/metrics', async (req, res) => {
    try {
        const metrics = await Metric.find();
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to add a new metric
app.post('/api/metrics', async (req, res) => {
    try {
        const { name, status } = req.body;
        const newMetric = new Metric({ name, status });
        await newMetric.save();
        res.json({ message: 'Metric added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
