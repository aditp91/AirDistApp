/* Globals */
var airportCodes = [];

Template.AirportPageDistances.rendered = function() {

	var api_key = "49258c6858e0b57faa8ea966075eecb8"; // created key using airport aero generator
	var airportsURL = "https://airport.api.aero/airport?user_key="+api_key;

	/*
	 	Cache airport codes so we can reference it as TYPEAHEAD autofill feature can use it when user types
	 */
	console.log("Distance page rendered. Fetching airport data");
	$.ajax({
		url: airportsURL,
		dataType: "jsonp",
		jsonpCallback: 'myJsonpCallback',
		success: function(data) {
			//console.log(data);
			airports = data.airports;

			$.each(airports, function(i, v) {
				if (v.country == "United States") {
					//console.log(v.name);
					airportCodes.push(v.code); // store into airportcodes object array
				}
			});

			Meteor.typeahead.inject();
		}
	});

};

//var TL = TLog.getLogger(TLog.LOGLEVEL_MAX,true,true);

var getDistance = function(departureCode, arrivalCode, e) {

	var api_key = "49258c6858e0b57faa8ea966075eecb8"; // created key using airport aero generator
	var URL = "https://airport.api.aero/airport/distance/"+departureCode+"/"+arrivalCode+"?user_key="+api_key;
	var distance = "";

	/*	Make HTTP get request from and airport aero
		In case of error: 'Access-Control-Allow-Origin' header not present,
		CORS must be installed in Google Chrome to enable cross origin/domain resource sharing
	 	https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US
	*/

	console.log('Making request to Airport Aero API: ' + URL);
	$.ajax({
		url: URL,
		dataType: "jsonp",
		jsonpCallback: 'myJsonpCallback',
		success: function(data) {
			console.log(data);
			distance = data.distance;
			distance = distance.replace(/\,/g,'');
			console.log("Got distance = "+distance);

			var distanceInNautMiles = parseInt(distance)*(0.539957);
			var form = $(e.currentTarget).parent();
			console.log("Nautical Miles: "+distanceInNautMiles);
			if (form) {
				$('#airports-distance-result').text(distanceInNautMiles+" Nautical Miles");
			}

			console.log(airportCodes);
		}
	});
};

Template.AirportPageDistances.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #airports-distance-button": function(e, t) {
		e.preventDefault();

		console.log("Reading codes from user input");
		var form = $(e.currentTarget).parent();
		if (form) {
			var departureInput = form.find("#airports-departuresearch-input");
			if (departureInput) {
				departureInput.focus();
				var departureCode = departureInput.val();
				console.log(departureCode);
			}
			var arrivalInput = form.find("#airports-arrivalsearch-input");
			if (arrivalInput) {
				arrivalInput.focus();
				var arrivalCode = arrivalInput.val();
				console.log(arrivalCode);
			}
		}

		if (arrivalCode === "" || departureCode === "") {
			alert("Please insert Airport IATA Codes");
		} else {
			/* Get the distance between the two airports, by obtaining information using SITA Airport Aero API
				Convert the distance from Kilometers to Nautical Miles
				1 km = 0.539957 nautical mile */
			getDistance(departureCode, arrivalCode, e);
		}
	}
});

Template.AirportPageDistances.helpers({
	airport_typeahead: function() {
		return airportCodes;
		//return ["SFO", "EWR", "YNG", "OGS", "GEG", "GFK", "OKC"];
	}
});

