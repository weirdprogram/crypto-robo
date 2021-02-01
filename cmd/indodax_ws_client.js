
const WebSocket = require('ws');
const Centrifuge = require("centrifuge");
const Os = require("os");
const Fs = require("fs");


const channels = [
    "dogeidr.trade",
    "btcidr.trade",
    "ethidr.trade",
    "xlmidr.trade",
    "xrpidr.trade",
];

(function(){
    const cIndodax = new Centrifuge('wss://ws.indodax.com/ws/', {websocket: WebSocket});

    cIndodax.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaW5mbyI6eyJuYW1lIjoiUHVibGljIn19.VJAHTrrfwxceSITpuPBl75LVM5bgojKGiUTOwCZxw-k");

    for(let c of channels){
        cIndodax.subscribe(c, function(message) {
            const msg = JSON.stringify(message) + Os.EOL;
            const dataFile = `${process.env.DATA_FOLDER}/${new Date().toJSON().slice(0,10).replace(/-/g, "")}_trade.json`;
            Fs.writeFileSync(dataFile, msg, {flag: "as+"});
        });
    }

    cIndodax.connect();
})()

