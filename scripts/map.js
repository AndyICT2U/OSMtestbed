// Initialising the map
//var map = L.map('mapid').setView([51.505, -0.09], 13);
var map = L.map('mapid').setView([51.46253, -0.011759], 14);
// Lewisham Centre = 51.46253, -0.011759

// create the tile layer with correct attribution
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 19, attribution: osmAttrib});		
var dlgMenu = document.getElementById("menuside");
//var searchOSM = "node[%22amenity%22=%22bench%22]";
//var searchOSM = "node[%22amenity%22=%22bench%22];node[%22amenity%22=%22toilets%22]";
var searchOSM = "'bench';'toilets'";

var LWMmaps = {"LWMlayers": [{"label":"Pharmacists","jsonname":"MEDICAL_PHARMACIES.geojson","id":"lwmPharmacies"},
                             {"label":"Activity Centres","jsonname":"BE_ACTIVEKEEP_FITSPORT.geojson","id":"lwmActivityCtrs"},
                             {"label":"Care Centres","jsonname":"CARING_GivingLTCsFamily_Centres.geojson","id":"lwmCareCtrs"}
                            ]};
var overlayLWMMaps = {};

//http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0Aarea%5Bname%3DLondon%5D-%3E.searchArea%3B%0A%28%0A%20%20node%5B%22fhrs%3Aid%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22fhrs%3Aid%22%5D%28area.searchArea%29%3B%0A%20%20relation%5B%22fhrs%3Aid%22%5D%28area.searchArea%29%3B%0A%29%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B

var LWMFeatureLayers = [];

createSideMenus();

map.on("contextmenu", function (event) {
  console.log("Coordinates: " + event.latlng.toString());
//  L.marker(event.latlng).addTo(map);
});

//map.addLayer(osm);

	
/*
var map = L.map('map', {
	center: [0, 0],
	zoom: 2,
	worldCopyJump: true
});
*/
// TODO: Create a dictionary mapping map layer names to map layers
var base_maps = {
	'OpenStreetMap':	osm,
	'Satellite':		L.layerGroup([L.esri.basemapLayer('Imagery'), 
									  L.esri.basemapLayer('ImageryLabels')]),
	'Streets':			L.esri.basemapLayer('Streets'),
	'Light Grey':		L.esri.basemapLayer('Gray'),
	'Dark Grey':		L.esri.basemapLayer('DarkGray'),
	'Oceans':			L.esri.basemapLayer('Oceans'),
	'Topographic':		L.esri.basemapLayer('Topographic'),
	'Shaded Relief':	L.esri.basemapLayer('ShadedRelief'),
	'Terrain':			L.esri.basemapLayer('Terrain'),
};
//base_maps[Object.keys(base_maps)[0]].addTo(map);
//base_maps['OpenStreetMap'].addTo(map);
base_maps['Streets'].addTo(map);
//base_maps['Satellite'].addTo(map);

//var LWMFeatureLayer = null;
function addLWMFeatures (geodata,label,LWMicon) {
//	if (LWMFeatureLayer) { LWMFeatureLayer.remove(); }
    
	var LWMFeatureLayer = L.geoJSON(geodata, {
		pointToLayer: function (feature, latlng) {
			var marker = L.marker(latlng, {icon : L.icon({iconUrl: './marker_icons/'+LWMicon, iconAnchor: [5, 5], popupAnchor: [0, -7]})});
//			marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
			marker.bindPopup("Name: "+feature.properties.name);
			return marker;
//			return L.marker(latlng, {
//				icon : L.icon({iconUrl: './marker_icons/bench.png', iconAnchor: [16, 8], popupAnchor: [0, -5]})
//			});
		}
	}).addTo(map);

    LWMFeatureLayers.push(LWMFeatureLayer);
    overlayLWMMaps[label] = LWMFeatureLayer;
}

function listOSMFeatures (osmdata) {
	var i;
	var amList = [];
	
	console.log(osmdata.features.length);
	for (i = 0; i < osmdata.features.length; i++) { 
//		console.log(osmdata.features[i].properties.amenity);
		if (!amList.includes(osmdata.features[i].properties.amenity)) {
//			console.log(osmdata.features[i].properties.amenity);
			amList.push(osmdata.features[i].properties.amenity);
		}
	}
	console.log(amList);

}

/*
function updateMap(filtered_ids) {
	if (geojsonLayer) { geojsonLayer.remove(); }

	geojsonLayer = L.geoJSON(dataLWM, {
		filter: function(feature, layer) {
			var geojson_id = feature.properties.id;
			if (!filtered_ids || filtered_ids.indexOf(geojson_id) > -1)
				return true;
			else
				return false;
		},
		onEachFeature: function (feature, layer) {
			// Parsing the contents of the feature
//			sat_layers[feature.properties.satellite].addLayer(layer);

			labels = format_metadata(feature);
			layer.bindPopup('<p style="text-align:center">' + 'thumbnail' +'</p>'
							  + '<p><b><u>Date/Time:</u></b> ' + labels['date_time'] + '</p>'
							  + '<p><b><u>Description:</u></b> ' + labels['description'] + '</p>'
							  + '<p><b><u>Data Products:</u></b> ' + labels['data_prods'] + '</p>');

		},

		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon : L.icon({iconUrl: sat_icons['Carbonite-2'], iconAnchor: [5, 5], popupAnchor: [0, -5]})
			});
		}
	}).addTo(map);
}
*/
//addLWMFeatures(dataLWM);
//listOSMFeatures(OSMdata);

function createSideMenus() {
//	dlgMenu.appendChild(document.createElement("br"));    
//	dlgMenu.appendChild(document.createTextNode("LWM My Maps:"));
//	dlgMenu.appendChild(document.createElement("br")); 

//var LWMmaps = {"LWMlayers": [{"label":"Pharmacists","jsonname":"MEDICAL_PHARMACIES.geojson","id":"lwmPharmacies"},
//                             {"label":"Activity Centres","jsonname":"BE_ACTIVEKEEP_FITSPORT.geojson","id":"lwmActivityCtrs"},
//                             {"label":"Care Centres","jsonname":"CARING_GivingLTCsFamily_Centres.geojson","id":"lwmCareCtrs"}
//                            ]};
	for (var i = 0; i < LWMmaps.LWMlayers.length; i++) {
//        AddLWMControlMenu(i, LWMmaps.LWMlayers[i].label, LWMmaps.LWMlayers[i].id, true, "checkbox");
        addLWMFeatures(LWMkmlgeo[i],LWMmaps.LWMlayers[i].label,LWMmaps.LWMlayers[i].id+".png");
    }
    L.control.layers(null, overlayLWMMaps).addTo(map);
//	AddLWMControlMenu(0, "Pharmacists", "PHARMACISTS", true, "checkbox");
//	dlgMenu.appendChild(document.createElement("br"));  
	dlgMenu.appendChild(document.createElement("br"));    
	dlgMenu.appendChild(document.createTextNode("OSM FEATURES:"));
	dlgMenu.appendChild(document.createElement("br"));  
	AddOSMControlMenu(1, "Benches", "bench", true, "checkbox");
	AddOSMControlMenu(2, "Toilets", "toilets", true, "checkbox");
	AddOSMControlMenu(3, "Telephone", "telephone", true, "checkbox");
	dlgMenu.appendChild(document.createElement("br"));  
	AddOSMControlMenu(0, "Open Search", null, true, "text");
}

	function AddLWMControlMenu(index, ctrlTitle, LWMTag, ctrlVisible, ctrlType)
	{
		var labCB = document.createElement('label');
		var inpCB = document.createElement("input");   
		inpCB.type = ctrlType;
		inpCB.id = "cbLWM" + index;
		inpCB.checked = ctrlVisible;
		switch(ctrlType) {
			case "checkbox":
				labCB.className = "mnuCheckbox";
				inpCB.value = LWMTag;
				inpCB.addEventListener('change', function() {
				  var checked = this.checked;
				  console.log("Clicked CB " + this.id + " so now set to " + checked);
				});
				break;
			case "text":
				inpCB.id = "LWMtext";
				inpCB.value = "";
				inpCB.addEventListener('change', function() {
					console.log("LWM search text: " + this.value);
				});
				break;
		}
		
		labCB.appendChild(inpCB);
		labCB.appendChild(document.createElement('span'));
		
		var label = document.createElement('label');
		label.htmlFor = inpCB.id;
		dlgMenu.appendChild(labCB);
		dlgMenu.appendChild(document.createTextNode(ctrlTitle));
        dlgMenu.appendChild(document.createElement("br"));    
	}
	
	function AddOSMControlMenu(index, ctrlTitle, OSMTag, ctrlVisible, ctrlType)
	{
//		configOpts.push(ctrlVisible);
//		CONFIG_OPTS[index],
		var labCB = document.createElement('label');
//		labCB.className = "mnuCheckbox";
		var inpCB = document.createElement("input");   
//		inpCB.value = ctrlTitle + '</br>';
		inpCB.type = ctrlType;
		inpCB.id = "configCB" + index;
		inpCB.checked = ctrlVisible;
		switch(ctrlType) {
			case "checkbox":
				labCB.className = "mnuCheckbox";
				inpCB.value = OSMTag;
				inpCB.addEventListener('change', function() {
				  var checked = this.checked;
				  console.log("Clicked CB " + this.id + " so now set to " + checked);
		//		  if (checked !== configOpts[index]) {
		//			configOpts[index] = checked;
		//		  }
				});
				break;
			case "text":
				inpCB.id = "OSMtext";
				inpCB.value = "";
				inpCB.addEventListener('change', function() {
					console.log("OSM search text: " + this.value);
				});
				break;
		}
		
/*		
		switch(index) {
			case 10: // effectively disabled for now by setting to 10
				inpCB.addEventListener('change', function() {
				  var checked = this.checked;
				  if (checked !== configOpts[index]) {
					configOpts[index] = checked;
				  }
				});
				break;
		}
*/		
		labCB.appendChild(inpCB);
		labCB.appendChild(document.createElement('span'));
		
		var label = document.createElement('label');
		label.htmlFor = inpCB.id;
		dlgMenu.appendChild(labCB);
		dlgMenu.appendChild(document.createTextNode(ctrlTitle));
        dlgMenu.appendChild(document.createElement("br"));    
	}
	
/*	function AddLayerToMenu(index, lyrTitle, lyrVisible, lyrObj)
	{
//	  var dlgMenu = new ol.dom.Input(document.getElementById("menu"));
		var labCB = document.createElement('label');
		labCB.className = "mnuCheckbox";
		var inpCB = document.createElement("input");   
		inpCB.value = lyrTitle + '</br>';
		inpCB.type = "checkbox";
		inpCB.id = "layerCB" + index;
		inpCB.checked = lyrVisible;
//		inpCB.onclick = "onclick='javascript:layerswitch(this)'";
//		addMsgtoDbgWnd( "Layer " + i + ":" + lyrTitle + " added as " + lyrVisible + " [" + lyrObj.getVisible() + "]");
		
		inpCB.addEventListener('change', function() {
		  var checked = this.checked;
		  if (checked !== lyrObj.getVisible()) {
			lyrObj.setVisible(checked);
		  }
		});
		labCB.appendChild(inpCB);
		labCB.appendChild(document.createElement('span'));
		
		var label = document.createElement('label');
		label.htmlFor = inpCB.id;
		dlgMenu.appendChild(labCB);
		dlgMenu.appendChild(document.createTextNode(lyrTitle));
        dlgMenu.appendChild(document.createElement("br"));    
//		var inpCBEl = document.getElementById(inpCB.id);
//		var CBBind = new ol.dom.Input(inpCBEl);
//		CBBind.bindTo('checked', lyrObj, 'visible');
	}
*/

