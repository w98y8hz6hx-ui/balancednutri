const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/balancednutri', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Example Schema and Model
const visitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// API Routes
app.get('/visitors', async (req, res) => {
    const visitors = await Visitor.find();
    res.json(visitors);
});

app.post('/visitors', async (req, res) => {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.json(visitor);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
