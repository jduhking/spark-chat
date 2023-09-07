const express = require('express');
const url = require('url')
const ws = require('ws');

const app = express();

const wss1 = new ws.Server({ noServer: true });
const wss2 = new ws.Server({ noServer: true });

wss1.on('connection', socket => {
  socket.on('message', (message) => {
    console.log(`Message from client1 ${message}`)
  })
});

wss2.on('connection', socket => {
    socket.on('message', (message) => {
      console.log(`Message from client2 ${message}`)
    })
  });

const server = app.listen(8080, () => {
    console.log('App listening of port 8080')
});
server.on('upgrade', (req, socket, head) => {

    const { pathname } = url.parse(req.url)
    console.log(pathname)
    if(pathname === '/client1'){
        console.log('connecting client 1')
        wss1.handleUpgrade(req, socket, head, socket => {
            wss1.emit('connection', socket, req)
        });

    } else if (pathname === '/client2') {
        console.log('connecting client 2')
        wss2.handleUpgrade(req, socket, head, socket => {
            wss2.emit('connection', socket, req)
        })
    }

   
});

app.get('/client1', (req, res) => {
    res.sendFile(__dirname + '/src/client1.html')    
})

app.get('/client2', (req, res) => {
    res.sendFile(__dirname + '/src/client2.html')
})