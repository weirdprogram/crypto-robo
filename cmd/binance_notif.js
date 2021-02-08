var cron = require('node-cron');
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

const initData = (URL, pair, interval) => {
    fileName = "candle_data_"+pair+"_"+interval+".json"
    axios.get(URL).then(res => {
        datalist = res.data
        var json = JSON.parse("[]")
        datalist.forEach((data, key) => {
            if (Object.is(datalist.length - 1, key)) {
                // TODO: Delete last record
            }
            openDate = convertDateTime(new Date(data[0]))
            closeDate = convertDateTime(new Date(data[6]))
            closePrice = parseFloat(data[4])
            data = {
                "open_date": openDate,
                "close_date": closeDate,
                "close_price": closePrice,
                "close_date_ut": data[6],
            }
            json.push(data);
        });

        fs.writeFile(fileName, JSON.stringify(json), (error)=> {
            if(error) console.error(error)
        })

    }).catch(error => {
        console.error(error)
    })

    return fileName
}

const dataProcessing = (URL, fileName) => {
    axios.get(URL).then(res => {
        data = res.data[0]
        openDate = convertDateTime(new Date(data[0]))
        closeDate = convertDateTime(new Date(data[6]))
        closePrice = parseFloat(data[4])
        
        fs.readFile(fileName, function (error, data) {
            if(error) console.error(error)
            var json = JSON.parse(data)
            data = {
                "open_date": openDate,
                "close_date": closeDate,
                "close_price": closePrice,
                "close_date_ut": data[6]
            }
            json.push(data);
        
            fs.writeFile(fileName, JSON.stringify(json), (error)=> {
                if(error) console.error(error)
            })
        })
    }).catch(error => {
        console.error(error)
    })
}

const sendNotification = (notificationType) => {
    //TODO: hit API AXIOS
}

const EMAProcess = (fileName) => {
    highEMA = 20;
    lowEMA = 5;

    //TODO: Add Trend MA

    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./ema.py', highEMA, lowEMA, fileName]);
    process.stdout.on('data', (data) => {
        if (data.alert) {
            sendNotification(data.type)
        }
    });
}


execute15m = ['0','15','30','45']
pair15m = ['DOGEUSDT']
pair15m.forEach((pair)=>{
    interval = "15m"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=10'
 
    filename = initData(APIInitData, pair, interval)

    execute15m.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(filename)
        })
    })
})


execute30m = ['0','30']
pair30m = ['DOGEUSDT']
pair30m.forEach((pair)=>{
    interval = "30m"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=10'
 
    filename = initData(APIInitData, pair, interval)

    execute30m.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(filename)
        })
    })
})

execute1h = ['0']
pair1h = ['DOGEUSDT']
pair1h.forEach((pair)=>{
    interval = "1h"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=10'
 
    filename = initData(APIInitData, pair, interval)

    execute1h.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(filename)
        })
    })
})