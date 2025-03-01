import { useState } from 'react';
import axios from 'axios';
import './App.css';

// Definimos un tipo para los datos de vuelo (basado en la respuesta de Aviationstack)
interface Flight {
  flight?: { iata: string };
  departure?: { iata: string; scheduled: string };
  arrival?: { iata: string };
}

function App() {
  const [depIata, setDepIata] = useState<string>(''); // Tipo string para el input
  const [flights, setFlights] = useState<Flight[]>([]); // Array de objetos Flight
  const [error, setError] = useState<string | null>(null); // String o null para errores
  const apiKey = '2a5de4724fa065da2797ec06d6351bc1';

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFlights([]);

    try {
      const response = await axios.get('http://api.aviationstack.com/v1/flights', {
        params: {
          access_key: apiKey,
          flight_status: 'scheduled',
          dep_iata: depIata.toUpperCase(),
        },
      });
      setFlights(response.data.data || []);
    } catch (err) {
      setError('Error al buscar vuelos: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="App">
      <h1>Buscador de Vuelos</h1>
      <form onSubmit={handleSearch}>
        <label>
          Aeropuerto de salida (IATA):
          <input
            type="text"
            value={depIata}
            onChange={(e) => setDepIata(e.target.value)}
            placeholder="Ej. JFK"
            maxLength={3}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              Vuelo {flight.flight?.iata || 'N/A'} - 
              Salida: {flight.departure?.iata} ({flight.departure?.scheduled || 'N/A'}) - 
              Llegada: {flight.arrival?.iata || 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron vuelos o realiza una búsqueda.</p>
      )}
    </div>
  );
}

export default App;