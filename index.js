
const fetch = require('node-fetch');

let alertConf = {
        "tickers":{
            "doge_idr":{
            "last": {
                "lt": 600
            }
        }
    }    
};

(async function(){
    const rsummaries =  await fetch('https://indodax.com/api/summaries');
    const summaries = await rsummaries.json();
    const alert = [];

    for(let [k1, v1]  of Object.entries(alertConf.tickers)){
        
        for(let [k2, v2]  of Object.entries(alertConf.tickers[k1])){
            const testVal = summaries.tickers[k1][k2];

            for(let [k3, v3]  of Object.entries(alertConf.tickers[k1][k2])){
                let testResult = false;
                switch(k3){
                    case "lt":
                        testResult = (testVal < v3);
                    break;
                    case "gt":
                        testResult = (testVal > v3)
                    break;
                }

                if(testResult){
                    let alertData = {};
                    alertData[k1] = alertConf.tickers[k1][k2];
                    alert.push(alertData);
                }
            }
        }
    }

    console.log(alert);
    process.exit(0);
})()

