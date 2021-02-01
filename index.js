
const Fetch = require('node-fetch');
const Centrifuge = require("centrifuge");
const WebSocket = require('ws');

(function(){
    const cIndodax = new Centrifuge('wss://ws.indodax.com/ws/', {websocket: WebSocket});

    cIndodax.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaW5mbyI6eyJuYW1lIjoiUHVibGljIn19.VJAHTrrfwxceSITpuPBl75LVM5bgojKGiUTOwCZxw-k");

    cIndodax.subscribe("dogeidr.trade", function(message) {
        if(message.data.price >= 600){
            console.log(message.data);
        }
    });

    cIndodax.subscribe("ethidr.trade", function(message) {
        if(message.data.price >= 20000000){
            console.log(message.data);
        }
    });

    cIndodax.connect();
})()
