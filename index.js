// const http = require('http');
// const color = require('colors');
// const handleServer  = function(req, res){
//     res.writeHead(200, {'Content-type': 'text/html'});
//     res.write('<h1>Diego Leon</h1>');
//     res.end();
// };
// const server  = http.createServer(handleServer);
// server.listen(3000, function(){
//     console.log('Server activo en el puerto 3000' .yellow);
// })
const express = require('express');
const color = require('colors');
const server = express();
server.get('/', function(req, res){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write('<h1>Diego Leon</h1>');
        res.end();
    }
)

server.listen(3000, ()=>{
    console.log('3000' .red)
})