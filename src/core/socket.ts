import { Server } from "socket.io";
import http from 'http';
import socket from 'socket.io';


export const createSocket = (server: http.Server): socket.Server  => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
          },
    });
    return io
}