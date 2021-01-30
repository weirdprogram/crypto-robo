const fetch = require('node-fetch');


(async function(){
    const response = await fetch('https://indodax.com/api/summaries');
    const data = await response.json();


    console.log(data);
})()
