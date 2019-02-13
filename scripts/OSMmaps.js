//https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186);out%20body;

var OSMresp = document.getElementById("osmresponse");


const findBenches = async () => {
//	OSMresp.innerHTML = map.getBounds().getWest() + ", "+ map.getBounds().getEast()+ ", "+ map.getBounds().getSouth()+ ", "+ map.getBounds().getNorth();
	if (map.getZoom() < 13) {
		OSMresp.innerHTML = "You are looking at too large an area. Try zooming in.";
	}
	else
	{
//	var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186);out%20body;'
		var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22]('+map.getBounds().getSouth()+","+map.getBounds().getWest()+","+map.getBounds().getNorth()+","+map.getBounds().getEast()+');out%20body;'
		const response = await fetch(overpassURL);
		const myJson = await response.json(); //extract JSON from the http response

		addOSMFeatures(osmtogeojson(myJson));
		OSMresp.innerHTML = "Found " + myJson["elements"].length + " benches";
//  OSMresp.innerHTML = myJson["elements"][0].lat + ", " + myJson["elements"][0].lon;
//  console.log(myJson);
	}
}

//osmtogeojson(osm_data);

/*
fetch(request).then((response) => {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
    });
});
*/

var OSMFeatureLayer = null;

function addOSMFeatures (osmdata) {
	if (OSMFeatureLayer) { OSMFeatureLayer.remove(); }

	OSMFeatureLayer = L.geoJSON(osmdata, {
		pointToLayer: function (feature, latlng) {
			var marker = L.marker(latlng, {icon : L.icon({iconUrl: './marker_icons/bench.png', iconAnchor: [16, 8], popupAnchor: [0, -7]})});
//			marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
			marker.bindPopup("id: "+feature.id);
			return marker;
//			return L.marker(latlng, {
//				icon : L.icon({iconUrl: './marker_icons/bench.png', iconAnchor: [16, 8], popupAnchor: [0, -5]})
//			});
		}
	}).addTo(map);
}

