function format_metadata(feature) {
	var geojson_id = feature.properties.id;
	var date_time = feature.properties.date_time;
	var description = feature.properties.description;
	var data_prods = feature.properties.data_prods;

	if (feature.geometry == null) {
//		var col_acq_id = acq_id;
	} else {
		var lat = feature.geometry.coordinates[1];
		var lng = feature.geometry.coordinates[0];
//		var col_acq_id = '<a href="javascript:map.setView([' + lat + ',' + lng +'], 8);">' + acq_id + '</a>';
	}

	// Formatting the parsed values based upon the satellite, and populating the table
	var data_prods_split = data_prods.split('\n');
	var labels = {'geojson_id':		geojson_id,
				  'date_time':		date_time,
				  'description':	description,
				  'data_prods':		'<p><a href="' + data_prods_split[0] + '" target="_blank">Quick Look</a></p>'};

	return labels;
}