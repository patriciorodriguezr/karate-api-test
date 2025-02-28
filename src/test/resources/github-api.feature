Feature: Probar la API de GitHub

Scenario: Obtener información de un usuario de GitHub
  Given url 'https://api.github.com'
  And path 'users/octocat'
  When method GET
  Then status 200
  And match response.login == 'octocat'
  And match response.name == 'The Octocat'
  And match response.location == 'San Francisco'
  
  Scenario: Obtener información de un usuario de GitHub
  Given url 'https://api.github.com'
  And path 'users/patriciorodriguezr'
  When method GET
  Then status 200
  And def userLogin = response.login
  And print 'Login del usuario:', userLogin
  And print response.public_repos == 6
