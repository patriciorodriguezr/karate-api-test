import express from 'express';
import axios from 'axios';

const app = express();

app.get('/flights', async (req, res) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(3001, () => console.log('Proxy corriendo en http://localhost:3001'));