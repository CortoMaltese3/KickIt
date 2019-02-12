﻿// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


function initAutocomplete() {
    var postParameterLat = $('#latitude');
    var postParameterLon = $('#longitude');
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.983810, lng: 23.727539 },
        zoom: 10,
        mapTypeId: 'roadmap'
    });

    var placeLocation;
    $('#search').submit(function (e) {
        if (placeLocation == undefined) {
            e.preventDefault();
        } else {
            postParameterLat.val(placeLocation.lat());
            postParameterLon.val(placeLocation.lng());
        }
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length != 1) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            
            placeLocation = place.geometry.location;
            $('#search').submit();
        });

        map.fitBounds(bounds);
    });
}


//var rad = function (x) {
//    return x * Math.PI / 180;
//};

//var getAllDistances = function (p) {

//    $.getJSON("/api/Locations", function (data) {
//        data.forEach(function (d) {

//            var pitchLocation = {
//                lat: function () {
//                    return d.latitude;
//                },
//                lng: function () {
//                    return d.longitude;
//                }
//            }

//            var distance = getDistance(p, pitchLocation);
//            var distance2 = getDistance2(p, pitchLocation);

//            $('#locations').append('<li><span class="bg-primary">' + d.description + ' => ' + d.latitude + ',' + d.longitude + '</span> Distance: ' + distance + ' Distance google api: ' + distance2 + '</li>');
//        });
//    });
//}
//var getDistance = function (p1, p2) {


//    var R = 6378137; // Earth’s mean radius in meter
//    var dLat = rad(p2.lat() - p1.lat());
//    var dLong = rad(p2.lng() - p1.lng());
//    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
//        Math.sin(dLong / 2) * Math.sin(dLong / 2);
//    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//    var d = (R * c) / 1000;
//    return d.toFixed(2); // returns the distance in meter
//};

//function getDistance2(p1, p2) {
//    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
//}