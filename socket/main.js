const express = require('express');

const ws = require('ws');

const app = express();
app.use(express.static('public'))

const wss1 = new ws.Server({ noServer: true });

wss1.on('connection', client => {
    console.log('a client has connected')
    
    client.on('message', (message) => {
    console.log(`Message from a client: \n ${message}`)
    broadcast(message)
  })
});

const server = app.listen(8080, () => {
    console.log('App listening of port 8080')
});
server.on('upgrade', (req, socket, head) => {

    wss1.handleUpgrade(req, socket, head, socket => {
        wss1.emit('connection', socket, req)
    });


});

function broadcast(msg) {
    for(const client of wss1.clients){
        if (client.readyState === ws.OPEN){
            client.send(msg)
        }
        
    }
}

app.get('/client1', (req, res) => {
    res.sendFile(__dirname + '/src/client1.html')    
})

app.get('/client2', (req, res) => {
    res.sendFile(__dirname + '/src/client2.html')
})