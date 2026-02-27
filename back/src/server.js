const http = require('http');
const app = require('./app');
const env = require('./config/env');
const connectDatabase = require('./config/db');
const configureCloudinary = require('./config/cloudinary');

async function bootstrap() {
  await connectDatabase();
  configureCloudinary();

  const server = http.createServer(app);

  server.listen(env.port, () => {
    console.log(`Servidor corriendo en http://localhost:${env.port}`);
  });

  const shutdown = (signal) => {
    console.log(`Recibido ${signal}. Cerrando servidor...`);
    server.close(() => {
      console.log('Servidor cerrado.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((error) => {
  console.error('Error iniciando la aplicación:', error);
  process.exit(1);
});
