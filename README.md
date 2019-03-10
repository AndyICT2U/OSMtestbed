# OSMtestbed
Testbed for Wellbeing Map using OSM API

Initial Leaflet.js based map which demonstrates how to call the OSM Overpass API.

I have found the easiest way to test locally is to use the 'Web Server for Chrome' extension. This allows you to choose a local folder to be treated as the root repository for a web server, which is then available at 127.0.0.1:8887

The important code snippet is in scripts\OSMmaps.js :-

	var overpassURL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22bench%22]('+map.getBounds().getSouth()+","+map.getBounds().getWest()+","+map.getBounds().getNorth()+","+map.getBounds().getEast()+');out%20body;'

that calls the Overpass API with 'node' set to filter for amenity=bench.

Update 10th March 2019

Map interface includes checkboxes for a few example OSM amenities and uses LWM MyMaps data for the Leaflet Layer control. The LWM layers are .js files of the geojson of the MyMaps KML export
