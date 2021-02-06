var express = require('express');
var app = express();
var port = 3000;

app.get('/ema', function (req, res) {
    highEMA = 5;
    lowEMA = 2;
    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./ema.py', highEMA, lowEMA]);
    process.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

app.listen(port)
