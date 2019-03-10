//https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186);out%20body;

var OSMresp = document.getElementById("osmresponse");

//http://overpass-api.de/api/interpreter?data=[out:json][timeout:25]%3B%0Aarea[name=London]-%3E.searchArea%3B%0A%28%0A  node['fhrs:id']%28area.searchArea%29%3B%0A  way['fhrs:id']%28area.searchArea%29%3B%0A  relation['fhrs:id']%28area.searchArea%29%3B%0A%29%3B%0Aout body%3B%0A%3E%3B%0Aout skel qt%3B
// http://overpass-api.de/api/interpreter?data=[out:xml];area[name='London'];(node'fhrs:id';way'fhrs:id';relation'fhrs:id';);out body;>;out skel qt;"
//https://www.overpass-api.de/api/interpreter?data=[out:json];node['amenity'='bench'](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186);out body;
//https://www.overpass-api.de/api/interpreter?data=[out:json];(node['amenity'='bench'];node['amenity'='toilets'](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186));out body;

//https://www.overpass-api.de/api/interpreter?data=[out:json];(node%20[amenity=toilets]%20(41.887350749043264,12.487324476242065,41.89219079567448,12.495371103286743);%20node%20[amenity=bench]%20(41.887350749043264,12.487324476242065,41.89219079567448,12.495371103286743););%20out;

const findBenches = async () => {
//	OSMresp.innerHTML = map.getBounds().getWest() + ", "+ map.getBounds().getEast()+ ", "+ map.getBounds().getSouth()+ ", "+ map.getBounds().getNorth();
	if (map.getZoom() < 13) {
		OSMresp.innerHTML = "You are looking at too large an area. Try zooming in.";
	}
	else
	{
//	var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22](51.501022526737486,-0.1130390167236328,51.51720883869884,-0.08085250854492186);out%20body;'
//		var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22]('+map.getBounds().getSouth()+","+map.getBounds().getWest()+","+map.getBounds().getNorth()+","+map.getBounds().getEast()+');out%20body;'
//		var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];'+searchOSM+'('+map.getBounds().getSouth()+","+map.getBounds().getWest()+","+map.getBounds().getNorth()+","+map.getBounds().getEast()+');out%20body;'
		var bbox = '('+map.getBounds().getSouth()+","+map.getBounds().getWest()+","+map.getBounds().getNorth()+","+map.getBounds().getEast()+')';
		var searches = constructOSMSearch(bbox);
		var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];('+searches+');out%20body;';
		console.log(overpassURL);
//		var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node[%22amenity%22=%22bench%22]'+bbox+';node[%22amenity%22=%22toilets%22]'+bbox+';);out%20body;'
		
		const response = await fetch(overpassURL);
		const myJson = await response.json(); //extract JSON from the http response

		addOSMFeatures(osmtogeojson(myJson));
		OSMresp.innerHTML = "Found " + myJson["elements"].length + " items";
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
			var marker = L.marker(latlng, {icon : L.icon({iconUrl: './marker_icons/'+ feature.properties.tags.amenity + '.png', iconAnchor: [16, 8], popupAnchor: [0, -7]})});
//			marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
			marker.bindPopup("id: "+feature.id+"\nType: "+feature.properties.tags.amenity);
//			console.log(feature.properties.tags.amenity);
			return marker;
//			return L.marker(latlng, {
//				icon : L.icon({iconUrl: './marker_icons/bench.png', iconAnchor: [16, 8], popupAnchor: [0, -5]})
//			});
		}
	}).addTo(map);
}

function constructOSMSearch(bbox) {
	var search = "";
	var i;
	
	var searchTB = document.getElementById("OSMtext");
	if (searchTB.value=="") {
		for (i = 1; i <= 3; i++) { 
			cb = document.getElementById("configCB" + i);
			if (cb.checked) {
				search += "node['amenity'='" + cb.value + "']"+bbox+";";
			}
		}
	} else {
		search = searchTB.value + bbox + ";";
	}

	return search;
}