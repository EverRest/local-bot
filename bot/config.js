const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    appName: process.env.APP_NAME,
    appEnv: process.env.APP_ENV,
    tgToken: process.env.TG_TOKEN,
    googleApiToken: process.env.GOOGLE_API_TOKEN,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
};