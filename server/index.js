const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kuldeep304057:tB1jUeHo2AUOVUnq@cluster0.tlcqvzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use('/api/events', eventRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));