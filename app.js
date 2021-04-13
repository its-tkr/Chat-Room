const { Socket } = require('dgram');
var express=require('express');
var http=require('http');

const { dirname } = require('path');

var app=express();
var server=http.createServer(app);
var io=require('socket.io')(server);
var path=require('path');

app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+ 'public/index.html');
});

var name;
io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('joining msg',(username)=>{
        name=username;
        io.emit('chat message',`---${name} joined the chat---`);
    });
    socket.on('disconnected',(socket)=>{
        name=username;
        io.emit('chat message',`---${nmae} left the chat---`);
    });
    socket.on('chat message',(msg)=>{
        socket.broadcast.emit('chat message',msg);
    });
});
server.listen(3000,()=>{
    console.log('server listening @ 3000');
});