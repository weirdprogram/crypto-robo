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

const initData = (URL, fileName) => {
    axios.get(URL).then(res => {
        datalist = res.data
        var json = JSON.parse("[]")
        datalist.forEach((data, key) => {
            if (Object.is(datalist.length - 1, key)) {
                return
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
}

const dataProcessing = (URL, fileName) => {
    axios.get(URL).then(res => {
        dataBody = res.data[0]
        openDate = convertDateTime(new Date(dataBody[0]))
        closeDate = convertDateTime(new Date(dataBody[6]))
        closePrice = parseFloat(dataBody[4])
        
        fs.readFile(fileName, function (error, data) {
            if(error) console.error(error)
            var json = JSON.parse(data)
            data = {
                "open_date": openDate,
                "close_date": closeDate,
                "close_price": closePrice,
                "close_date_ut": dataBody[6],
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

const sendNotification = (notification) => {
    axios.post('http://localhost:8080/v1/notification/send-alert-crypto', {
        type: notification.type,
        pair: notification.pair,
        indicator: notification.indicator,
        close_price: notification.closePrice,
        close_time: notification.closeTime,
        url: "https://www.techinasia.com/jobs",
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
    });
}


const EMAProcess = (fileName, pair, interval) => {
    highEMA = 20;
    lowEMA = 5;
    indicator = "EMA "+lowEMA+" & "+highEMA
    
    //TODO: Add Trend MA

    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./ema.py', highEMA, lowEMA, fileName]);
    process.stdout.on('data', (data) => {
        var data = JSON.parse(data)
        if (!data.alert) {
            var notification = {
                type: data.alert, 
                pair: pair, 
                interval: interval, 
                indicator: indicator,
                closePrice: data.close_price,
                closeTime: data.close_date_ut,
            };
            console.log(notification)
            sendNotification(notification)
        }
    });
}


execute15m = ['0','15','30','45']
pair15m = ['DOGEUSDT']
pair15m.forEach((pair)=>{
    interval = "15m"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=100'

    fileName = "candle_data_"+pair+"_"+interval+".json"
    initData(APIInitData, fileName)

    execute15m.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(fileName, pair, interval)
        })
    })
})


execute30m = ['0','30']
pair30m = ['DOGEUSDT']
pair30m.forEach((pair)=>{
    interval = "30m"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=100'
 
    fileName = "candle_data_"+pair+"_"+interval+".json"
    initData(APIInitData, fileName)

    execute30m.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(fileName, pair, interval)
        })
    })
})

execute1h = ['0']
pair1h = ['DOGEUSDT']
pair1h.forEach((pair)=>{
    interval = "1h"
    APIProcessingData   = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=1'
    APIInitData         = 'https://api.binance.com/api/v1/klines?symbol='+pair+'&interval='+interval+'&limit=100'
 
    fileName = "candle_data_"+pair+"_"+interval+".json"
    initData(APIInitData, fileName)

    execute1h.forEach((execute) => {
        cron.schedule(execute+' 0-23 * * *', () => {
            dataProcessing(APIProcessingData, fileName)
            EMAProcess(fileName, pair, interval)
        })
    })
})