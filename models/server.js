// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http Server
    this.server = http.createServer(this.app);

    //Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  configureSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    // Habilitando CORS
    this.app.use(cors());
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configureSockets();

    // Inicializar server
    this.server.listen(this.port, () =>
      console.log('Server corriendo en puerto: ', this.port)
    );
  }
}

module.exports = Server;
