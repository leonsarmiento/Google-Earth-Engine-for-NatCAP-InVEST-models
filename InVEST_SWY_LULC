// This Google Earth Engine Javascript clip and export the required static datasets required for InVEST SWY

Map.setOptions("TERRAIN")
Map.addLayer(AOI);
var basin = basins.filterBounds(Kitwe) // This could be any geometry of interest

var EPSG = 'EPSG:3857'
//////////////////////////////////////////////////
var dataset = ee.Image("WWF/HydroSHEDS/03CONDEM").clip(basin)
Map.addLayer(dataset,{min:1100,max:1450},"DEM")

var resolution = 90

var reprojected = dataset.reproject(EPSG, null, resolution);

//
Export.image.toDrive({
    image: reprojected,
    description: "DEM",
    scale: resolution,
    region: basin,
    folder: 'GEE'
    });

//////////////////////////////////////////////////
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first().select('Map').clip(basin)
Map.addLayer(dataset,{},"LULC")

var resolution = 10

var reprojected = dataset.reproject(EPSG, null, resolution);

//
Export.image.toDrive({
    image: reprojected,
    description: "LULC",
    scale: resolution,
    region: basin,
    folder: 'GEE'
    });

//////////////////////////////////////////////////
var dataset = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02").select('b0').clip(basin)
Map.addLayer(dataset,{min:0,max:100,palette:["navy","yellow"]},"SAND %")

var resolution = 250

var reprojected = dataset.reproject(EPSG, null, resolution);

//
Export.image.toDrive({
    image: reprojected,
    description: "SAND_percent",
    scale: resolution,
    region: basin,
    folder: 'GEE'
    });

//////////////////////////////////////////////////
var dataset = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02").select('b0').clip(basin)
Map.addLayer(dataset,{min:0,max:100,palette:["navy","yellow"]},"CLAY %")

var resolution = 250

var reprojected = dataset.reproject(EPSG, null, resolution);

//
Export.image.toDrive({
    image: reprojected,
    description: "CLAY_percent",
    scale: resolution,
    region: basin,
    folder: 'GEE'
    });

//////////////////////////////////////////////////

var CLAY = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02").select('b0').clip(basin)
var SAND = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02").select('b0').clip(basin)
var dataset = ((CLAY.gte(0)).multiply(100)).subtract(CLAY.add(SAND))
Map.addLayer(dataset,{min:0,max:100,palette:["navy","yellow"]},"SILT %")

var resolution = 250

var reprojected = dataset.reproject(EPSG, null, resolution);

//
Export.image.toDrive({
    image: reprojected,
    description: "SILT_percent",
    scale: resolution,
    region: basin,
    folder: 'GEE'
    });
    

//////////////////////////////////////////////////
