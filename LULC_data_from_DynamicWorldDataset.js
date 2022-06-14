// INSTRUCTIONS:

// 1. Draw a polygon in the map view on the area of interest, and leave its name as the default "geometry"
// 2. Adjust START and END date to your period of interest
// 3. RUN this code

Map.setOptions("HYBRID")
Map.centerObject(geometry)

var start = '2022-01-01'
var end = '2023-02-01'

var dataset = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
              .filterBounds(geometry)
              .filter(ee.Filter.date(start,end))
              .sort('system:time_start',false)
              

print (dataset)

var image = dataset.mean().clip(geometry)

var viz = {bands:['grass','trees','water'],min:0,max:0.9}

Map.addLayer(dataset,viz,"Dynamic World NRT 2022")

print("This Image:")
print(image)
