const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Habilitar CORS para permitir solicitudes desde localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Origen permitido
}));

app.get('/flights', async (req, res) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy corriendo en http://localhost:3001'));