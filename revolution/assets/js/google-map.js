	var base_url = window.location.origin;
	
	/* window.onload = loadScript;

	function loadScript() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBbJ16uUP1tqA_-qsojvMCBV12V71rukHA&sensor=true&' +
			'callback=initialize';
		//document.body.appendChild(script);
		document.getElementsByTagName('head')[0].appendChild(script);
	} */

	var geocoder, map;
	
	function initialize(divId="",adrresss="") {
		console.log("DIV ID = "+divId);
		geocoder = new google.maps.Geocoder();

		var styles = [
			{
				"stylers": [
					{ "visibility": "on" }
				]
			},
			{
				"featureType": "landscape.natural",
					"stylers": [
						{ "visibility": "simplified" },
						{ "color": "#f0f0f0" }
					]
			},
			{
				"featureType": "water",
				"stylers": [
					{ "visibility": "simplified" },
					{ "color": "#C2E7F5" }
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "simplified" },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.stroke",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.icon",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#646464" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "weight": 1 },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{ "lightness": 90 },
					{ "color": "#d7d7d7" },
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#b8b8b8" }
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "on" },
					{ "lightness": 60 },
					{ "saturation": -90 },
					{ "gamma": 0.90 }
				]
			}
		];
		
		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Styled Map"
		});
			
		var mapOptions = {
			zoom: 15,
			scrollwheel: false,
			panControl: false,
			scaleControl: false,
			mapTypeControlOptions: {
				mapTypeIds: []
			}
		};
		var mapPlaceholder = document.getElementById('custom-map-canvas');
		
		if(divId == null || divId == "" || divId == 'undefined'){
			mapPlaceholder = document.getElementById('map-canvas');
			gMapAddress = "blok cl 1/, Jl. Kelapa Cengkir Raya Blok CL1 No.10, RT.7/RW.12, East Kelapa Gading, Kelapa Gading, North Jakarta City, Jakarta 14240";
		}
		else{
			mapPlaceholder = document.getElementById(divId);
			gMapAddress = adrresss;
		}
		
		if(mapPlaceholder) {
			customMap = new google.maps.Map(mapPlaceholder, mapOptions);
			customMap.mapTypes.set('map_style', styledMap);
			customMap.setMapTypeId('map_style');
			codeAddress(customMap,gMapAddress);
		}
		
		if(mapPlaceholder) {
			defaultMap = new google.maps.Map(mapPlaceholder, mapOptions);
			codeAddress(defaultMap,gMapAddress);
		}
	}

	function codeAddress(theMap,gMapAddress) {
		var address = '"'+gMapAddress+'"'; //"blok cl 1/, Jl. Kelapa Cengkir Raya Blok CL1 No.10, RT.7/RW.12, East Kelapa Gading, Kelapa Gading, North Jakarta City, Jakarta 14240";
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				theMap.setCenter(results[0].geometry.location);
				var image = new google.maps.MarkerImage(base_url+"/demo/assets/images/location-pin.png", null, null, null, new google.maps.Size(32, 32));
				var beachMarker = new google.maps.Marker({
					map: theMap,
					icon: image,
					position: results[0].geometry.location
				});

			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}