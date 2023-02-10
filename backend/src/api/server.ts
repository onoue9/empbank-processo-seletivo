require('dotenv').config();
import App from '../api/app';

const server = new App();

server.startServer();
