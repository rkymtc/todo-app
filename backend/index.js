const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS modülünü import et
const notesRoutes = require('./routes/notes');

dotenv.config();

const app = express();

// CORS'u kullan
app.use(cors());

// JSON body parsing
app.use(bodyParser.json());

// Notes endpoint
app.use('/notes', notesRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
