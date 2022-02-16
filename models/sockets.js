class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On Connection
    this.io.on('connection', (socket) => {
      // Server escucha evento
      socket.on('mensaje-to-server', (data) => {
        console.log(data);

        // Server emite evento para todos
        this.io.emit('mensaje-from-server', data);
      });
    });
  }
}

module.exports = Sockets;
