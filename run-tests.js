const { execSync } = require('child_process');
  // Ejecuta el comando de Karate con la opción para generar reportes

try {
  const result = execSync(
    'java -cp karate-1.5.1.jar com.intuit.karate.Main src/test/resources/github-api.feature -o target',
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('Error ejecutando Karate:', error);
  process.exit(1);
}