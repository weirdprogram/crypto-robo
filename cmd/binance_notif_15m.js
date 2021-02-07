var cron = require('node-cron');
const request = require('request');
var fs = require('fs')
const axios = require('axios');


const convertDateTime = (fullDateTime) => {
    const datetime = fullDateTime.getDate() + "-"
        + (fullDateTime.getMonth()+1)  + "-" 
        + fullDateTime.getFullYear() + " @ "  
        + fullDateTime.getHours() + ":"  
        + fullDateTime.getMinutes();
    return datetime
}

const dataProcessing = () => {
    binanceAPI = 'https://api.binance.com/api/v1/klines?symbol=DOGEUSDT&interval=15m&limit=1'
    axios.get(binanceAPI).then(res => {
        data = res.data[0]
        openDate = convertDateTime(new Date(data[0]))
        closeDate = convertDateTime(new Date(data[6]))
        closePrice = parseFloat(data[4])
        
        fs.readFile('candle_data.json', function (error, data) {
            if(error) console.error(error)
            var json = JSON.parse(data)
            data = {
                "open_date": openDate,
                "close_date": closeDate,
                "close_price": closePrice,
            }
            json.push(data);
        
            fs.writeFile("candle_data.json", JSON.stringify(json), (error)=> {
                if(error) console.error(error)
            })
        })
    }).catch(error => {
        console.error(error)
    })
}

const sendNotification = (notificationType) => {
    // hit API AXIOS
}

const EMAProcess = () => {
    highEMA = 20;
    lowEMA = 5;
    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./ema.py', highEMA, lowEMA]);
    process.stdout.on('data', (data) => {
        if (data.alert) {
            sendNotification(data.type)
        }
    });
}


execute = ['0','15','30','45', '35']

execute.forEach((value) => {
    cron.schedule(value+' 0-23 * * *', () => {
        dataProcessing()
        EMAProcess()
    });
});
