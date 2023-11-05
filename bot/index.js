const express = require('express');
const app = express();
// const redis = require('ioredis');
const {appName, tgToken, botSettings, redisHost, redisPort} = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(tgToken, botSettings);
const {getTopPlacesByCoordinates} = require('./utils/google');

// const redisClient = redis.createClient({
//     host: redisHost,
//     port: redisPort
// });

// TODO:
// 1. integrate tg via BotFather +
// 2. test messaging +
// 3. implement btn GetLocation +
// 4. integrate google sdk +
// 5. get locations by criteria
// 6. rework GetLocation to GeoMenu and split result by categories
// 7. store statistic to db
// 8. cache user geolocation results to redis

bot.onText(/\/start/, function (msg) {
    const {id} = msg.chat;
    const option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My location",
                request_location: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(id, "Where are you?", option).then(() => {
        bot.once("location", (msg) => {
            const places = getTopPlacesByCoordinates(msg.location.latitude, msg.location.longitude);
            bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude, msg.location.latitude].join(";"));
        })
    });
});

app.listen(81, function () {
    console.log(`${appName} is running.`);
});