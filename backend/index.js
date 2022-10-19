const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const room = "Vikings Room";

// listening to socket connection

io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);


    // join a user into a room

    socket.on("join_room", payload => {
        socket.join(room);
        console.log(`${payload.username} with ID ${socket.id} joined ${room}`);
        io.emit("receive_room", room);
    })

    // handling send message event
    socket.on("send_message", data => {
        socket.to(room).emit("receive_message", data);
    })


    // disconnection from socket
    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`)
    })
});


const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})