const express = require('express');
const cors = require('cors');

const API_PORT = process.env.PORT || 3001;

export default class App {

  private app;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  startServer() {
    this.app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
  }
}
