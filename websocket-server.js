const WebSocket = require('ws');

// Crear el servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Nuevo cliente conectado');

    // Enviar datos a los clientes cada 5 segundos (simulando datos)
    setInterval(() => {
        const data = {
            timestamp: new Date(),
            value: Math.random() * 100 // Simular un valor aleatorio
        };
        ws.send(JSON.stringify(data)); // Enviar datos al cliente
    }, 5000);

    // Manejar mensajes recibidos del cliente
    ws.on('message', message => {
        console.log(`Mensaje recibido: ${message}`);
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
