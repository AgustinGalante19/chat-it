import { type WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

type Event = 'message' | 'register';

interface GenericEvent {
  type: Event;
  id: string;
}

interface Message extends GenericEvent {
  toId: string;
  content: string;
}

interface Client {
  id: string;
  socket: WebSocket;
}

const clients: Client[] = [];

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString()) as Message;
    if (data.type === 'register') {
      const client: Client = { id: data.id, socket: ws };
      clients.push(client);
      console.log(`Client ${data.id} connected`);
      ws.send(
        JSON.stringify({
          type: 'register',
          id: client.id,
        })
      );
    } else if (data.type === 'message') {
      const recipient = clients.find((e) => e.id === data.toId);
      if (recipient) {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString();
        const time = currentTime.split(':').splice(0, 2).join(':');
        const message = {
          id: data.id,
          content: data.content,
          toId: data.toId,
          time,
        };
        recipient.socket.send(JSON.stringify(message));
      }
    }
  });
});

console.log('running..');
