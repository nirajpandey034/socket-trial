const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors:{
        origin: '*'
    }
});

io.on('connection',(socket)=>{
    console.log('a user connected');
})

io.on("connection",(socket)=>{
    console.log("user connected");

    socket.on("data",(payload)=>{
        console.log(payload);
        io.emit('data', payload);
    })
})

http.listen(5000,()=>{console.log("listening on 5000")});