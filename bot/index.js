const os = require('os');
const express = require('express');
const app = express();
const redis = require('ioredis');
const {appName, redisHost, redisPort} = require('./config');

const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort
});

app.get('/', function (req, res) {
    redisClient.get('numVisits', function (err, numVisits) {
        let numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
        res.send(os.hostname() + ': Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.listen(81, function () {
    console.log(appName);
    console.log(`${appName} is running on port 80`);
});