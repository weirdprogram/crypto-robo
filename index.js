
const dataJsonPath = "./data.json";
const dataLenHours = process.env.DATA_LEN_HOURS || 4;

const fetch = require('node-fetch');
const fs = require('fs');
const underscore = require('underscore');


let dataJson = require(dataJsonPath);

(async function(){
    const rServerTime = await fetch('https://indodax.com/api/server_time');
    const serverTime = await rServerTime.json();

    const rSummary =  await fetch('https://indodax.com/api/summaries');
    const summary = await rSummary.json();

    summary["server_time"] = serverTime;

    dataJson.push(summary);

    fs.appendFileSync(dataJsonPath, JSON.stringify(dataJson), {flag: 'w'});

    const currentServerTime = serverTime.server_time;

    dataJson = underscore.filter(dataJson, (r) => {
        return r.server_time.server_time > (currentServerTime - (3600 * parseInt(dataLenHours) * 1000));
    });

    dataJson = underscore.sortBy(dataJson, (r) => {
        return r.server_time.server_time;
    });

    const firstRecord = dataJson[0];

    const lastRecord = underscore.last(dataJson);

    const summaryReport = {}
    for(let [k, v]  of Object.entries(lastRecord.tickers)){

        if(k.includes("usd")){
            continue;
        }

        const price4 = firstRecord.tickers[k].last;
        const price24 = lastRecord["prices_24h"][k.replace('_', '')];

        const diffPrice4 = (v.last - price4);
        const diffPrice24 = (v.last - price24);

        summaryReport[k] = {
            pairs:k ,
            isPriceUp: (diffPrice24 > 0),
            diffPrice4: diffPrice4,
            diffPrice24: diffPrice24,
            volume: parseInt(v.vol_idr)

        }
    }


    // console.log(dataJson[0]["tickers"]["btc_idr"]);
    // console.log(dataJson[0]["prices_24h"]["btcidr"]);
    // console.log(dataJson[0]["prices_7d"]["btcidr"]);
    // console.log(dataJson.length);

    // console.log(dataJson[17].server_time.server_time);

    // console.log(dataJson.length);
    process.exit(0)
})()
