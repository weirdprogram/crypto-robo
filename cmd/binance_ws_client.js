const Centrifuge = require("centrifuge")
const WebSocket = require('ws');

(()=>{
    
    const binance = new Centrifuge('wss://stream.binance.com:9443/ws/', {websocket: WebSocket})
    console.log("Listen to DOGEUSDT 1M")
    binance.subscribe("dogeusdt@miniTicker", (message) => {
        const msg = JSON.stringify(message) + Os.EOL;
        console.log(msg)
    });

    binance.connect()
})()