Feature: Probar la API de GitHub

Scenario: Obtener información de un usuario de GitHub
  Given url 'https://api.github.com'
  And path 'users/octocat'
  When method GET
  Then status 200
  And print 'Respuesta primer escenario:', response
  And match response.login == 'octocat'
  And match response.name == 'The Octocat'
  And match response.company == 'GitHub'
  And match response.location == 'San Francisco'
  And match response.public_repos == 9  # Corregí "repositories" a "public_repos"

Scenario: Obtener información de un usuario de GitHub
  Given url 'https://api.github.com'
  And path 'users/octocat'
  When method GET
  Then status 200
  And def userLogin = response.login
  And print 'DEPURANDO SEGUNDO ESCENARIO'
  And print 'Login del usuario:', userLogin
  And print 'Estado HTTP:', responseStatus
  And print 'Respuesta completa:', response
  And match userLogin == 'octocat'
  And match response.name == 'WRONG_NAME'  # Debería fallar

  Scenario: Obtener información de un usuario de GitHub
  Given url 'https://api.github.com'
  And path 'users/patriciorodriguezr'
  When method GET
  Then status 200
  And def userLogin = response.login
  And print 'Login del usuario:', userLogin
  And print 'Respuesta completa:', response
  And match userLogin == 'patriciorodriguezr'