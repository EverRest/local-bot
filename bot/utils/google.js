const {googleApiToken} = require('../config');
const {Client} = require("@googlemaps/google-maps-services-js");
const google = new Client({});

function getTopPlacesByCoordinates(lat, lng, min = 4.6) {
    const places = getLocationsByCoordinates(lat, lng);
    return places;
}

function getLocationsByCoordinates(lat, lng) {
    google
        .placesNearby({
            params: {
                locations: [{lat: lat, lng: lng}],
                key: googleApiToken
            },
            timeout: 1000,
        })
        .then((r) => {
            console.log(r.data.results[0].location);
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
        });

    return []
}

module.exports = {
    getTopPlacesByCoordinates,
};