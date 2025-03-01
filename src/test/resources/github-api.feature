Feature: Buscar vuelos comerciales con Aviationstack

Scenario: Obtener vuelos programados desde JFK
  Given url 'http://api.aviationstack.com/v1/flights'
  And param access_key = '2a5de4724fa065da2797ec06d6351bc1'  # Reemplaza con tu clave
  And param flight_status = 'scheduled'
  And param dep_iata = 'JFK'  # Vuelos que salen de JFK
  When method GET
  Then status 200
  And print 'Respuesta de vuelos:', response
  And match response.data[0].flight_status == 'scheduled'
  And match response.data[0].departure.iata == 'JFK'
  And print response.error.message