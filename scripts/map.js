// Initialising the map
var map = L.map('mapid').setView([51.505, -0.09], 13);

// create the tile layer with correct attribution
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 19, attribution: osmAttrib});		

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
base_maps[Object.keys(base_maps)[0]].addTo(map);

