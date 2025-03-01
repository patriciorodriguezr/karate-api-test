import { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Flight {
  flight?: { iata: string };
  departure?: { iata: string; scheduled: string };
  arrival?: { iata: string };
}

function App() {
  const [depIata, setDepIata] = useState<string>(''); // Aeropuerto de salida
  const [arrIata, setArrIata] = useState<string>(''); // Aeropuerto de llegada
  const [tripType, setTripType] = useState<string>('one-way'); // Tipo de viaje (solo ida o ida y vuelta)
  const [flights, setFlights] = useState<Flight[]>([]); // Vuelos de ida
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]); // Vuelos de vuelta (si aplica)
  const [error, setError] = useState<string | null>(null);
  const apiKey = '2a5de4724fa065da2797ec06d6351bc1';

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFlights([]);
    setReturnFlights([]);

    try {
      // Búsqueda de vuelos de ida
      const response = await axios.get('http://localhost:3001/flights', {
        params: {
          access_key: apiKey,
          flight_status: 'scheduled',
          dep_iata: depIata.toUpperCase(),
          ...(tripType === 'round-trip' && { arr_iata: arrIata.toUpperCase() }), // Solo agrega arr_iata si es ida y vuelta
        },
      });
      setFlights(response.data.data || []);

      // Si es ida y vuelta, buscar vuelos de regreso
      if (tripType === 'round-trip' && arrIata) {
        const returnResponse = await axios.get('http://localhost:3001/flights', {
          params: {
            access_key: apiKey,
            flight_status: 'scheduled',
            dep_iata: arrIata.toUpperCase(), // Invertimos: salida desde llegada
            arr_iata: depIata.toUpperCase(), // llegada al origen
          },
        });
        setReturnFlights(returnResponse.data.data || []);
      }
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
        <label>
          Tipo de viaje:
          <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
            <option value="one-way">Solo ida</option>
            <option value="round-trip">Ida y vuelta</option>
          </select>
        </label>
        {tripType === 'round-trip' && (
          <label>
            Aeropuerto de llegada (IATA):
            <input
              type="text"
              value={arrIata}
              onChange={(e) => setArrIata(e.target.value)}
              placeholder="Ej. LAX"
              maxLength={3}
            />
          </label>
        )}
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {flights.length > 0 ? (
        <>
          <h2>Vuelos de ida</h2>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                Vuelo {flight.flight?.iata || 'N/A'} - 
                Salida: {flight.departure?.iata} ({flight.departure?.scheduled || 'N/A'}) - 
                Llegada: {flight.arrival?.iata || 'N/A'}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No se encontraron vuelos de ida o realiza una búsqueda.</p>
      )}
      {tripType === 'round-trip' && returnFlights.length > 0 ? (
        <>
          <h2>Vuelos de vuelta</h2>
          <ul>
            {returnFlights.map((flight, index) => (
              <li key={index}>
                Vuelo {flight.flight?.iata || 'N/A'} - 
                Salida: {flight.departure?.iata} ({flight.departure?.scheduled || 'N/A'}) - 
                Llegada: {flight.arrival?.iata || 'N/A'}
              </li>
            ))}
          </ul>
        </>
      ) : tripType === 'round-trip' ? (
        <p>No se encontraron vuelos de vuelta o realiza una búsqueda.</p>
      ) : null}
    </div>
  );
}

export default App;