/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {
    var mapElem = document.getElementById('map'); // didn't use jQuery because google map construction function wants
    // a DOM element, it won't work with jquery object

    function createMap(elem, center, zoom) {
        var map = new google.maps.Map(elem, {
            center: center,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP //
        });

        // google maps api
        // https://developers.google.com/maps/documentation/javascript/reference#Marker
        var marker = new google.maps.Marker({
            position: center, // puts the position on the center of UW campus
            map: map, // tell creator which map to be on top of
            animation: google.maps.Animation.DROP // makes the marker drop onto the page
        });

        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent("<h2>Here I am!</h2><p>Don't you wish you were here.</p>");

        google.maps.event.addListener(marker, 'click', function() {
            console.log('marker was clicked');
            infoWindow.open(map, marker); // want the info window anchored to the marker.
        });
    }

    var center = {
        lat: 47.655,
        lng: -122.3080
    };

    function onGeoSuccess(position) {
        var curPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        createMap(mapElem, curPos, 14);
    }

    function onGeoError(error) {
        console.log(error);
        createMap(mapElem, center, 14); // if they reject the browser's ask to use location
    }

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true,
            maximumAge: 100000
        });
    } else {
        createMap(mapElem, center, 14);
    }
}); // doc ready