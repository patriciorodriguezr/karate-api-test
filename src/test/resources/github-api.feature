Feature: Buscar vuelos comerciales con Aviationstack

Scenario: Obtener vuelos programados desde JFK
  Given url 'http://api.aviationstack.com/v1/flights'
  And param access_key = 'C5f2b510fce09a61a7268f52d6b0e7269'  # Reemplaza con tu clave
  And param flight_status = 'scheduled'
  And param dep_iata = 'JFK'  # Vuelos que salen de JFK
  When method GET
  Then status 200
  And print 'Respuesta de vuelos:', response
  And match response.data[0].flight_status == 'scheduled'
  And match response.data[0].departure.iata == 'JFK'