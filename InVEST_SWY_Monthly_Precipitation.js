// This Google Earth Engine Javascript code reduces and export CHIRPS time series in the appropiate format required for InVEST SWY

Map.setOptions("TERRAIN")
//Map.addLayer(AOI);
//var basin = basins.filterBounds(Kitwe) // This could be any geometry of interest or AOI
var basin = AOI // a rectangle cna be draw to define AOI

var band_name = 'precipitation' // or 'RainEvent'

var EPSG = 'EPSG:3857'
//////////////////////////////////////////////////
var startyear = 2000;
var endyear = 2020;

var period = startyear+"_"+endyear
print(period)

var startdate = ee.Date.fromYMD(startyear, 1, 1);
var enddate = ee.Date.fromYMD(endyear + 1, 1, 1);

var increment = 'year'
var total_steps = enddate.difference(startdate,'years')
print(total_steps.int())
var total_steps = total_steps.subtract(1)

//////////////////////////////////////////////////

var pixel_scale = 5000
var factor = 1

var AddRainEvent = function (image) {
  var RainEvent = image.expression (
    'total_precipitation > precip_threshold',
    {'total_precipitation' : image.select('precipitation'),
      'precip_threshold' : precip_threshold,
    }
    )
    .rename('RainEvent')
  return image.addBands(RainEvent);  
};
  

var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
                    .filter(ee.Filter.date(startdate,enddate))
                    .map(AddRainEvent)

print (CHIRPS)

Map.addLayer(CHIRPS.select(band_name).sum().divide(total_steps).clip(basin),{min:1200,max:1600,palette:['cyan','yellow','red']},band_name,true,1)

////////////////////////////////////

  var dataset = CHIRPS;


  // make a date object
  var startdate = ee.Date.fromYMD(2010, 1, 1);
  var enddate = ee.Date.fromYMD(2021, 1, 1);
  
  // make a list with years
  var years = ee.List.sequence(startyear, endyear);
  // make a list with months
  var months = ee.List.sequence(1, 12);

  var monthly_val =  ee.ImageCollection.fromImages(
    years.map(function (y) {
      return months.map(function(m) {
        var w = dataset.filter(ee.Filter.calendarRange(y, y, 'year'))
                      .filter(ee.Filter.calendarRange(m, m, 'month'))
                      .sum(); 
        return w.set('year', y)
                .set('month', m)
                .set('system:time_start', ee.Date.fromYMD(y, m, 1));
  
      });
    }).flatten()
  );

  var mean_monthly_val =  ee.ImageCollection.fromImages(
    months.map(function (m) {
      var w = monthly_val.filter(ee.Filter.eq('month', m)).mean();
      return w.set('month', m)
              .set('system:time_start',ee.Date.fromYMD(1, m, 1));
    }).flatten()
  );
  
  var title = {
    title: 'Monthly values',
    hAxis: {title: 'Month'},
    vAxis: {title:band_name },
  };
  
  var chartMonthly = ui.Chart.image.seriesByRegion({
    imageCollection: mean_monthly_val,
    regions: basin,
    reducer: ee.Reducer.mean(),
    band: band_name,
    scale: pixel_scale,
    xProperty: 'system:time_start',
    seriesProperty: 'SITE'
  }).setOptions(title)
    .setChartType('ColumnChart');
  
  print(chartMonthly);
  
/////////////////////////////////

  var listOfImages = mean_monthly_val.toList(mean_monthly_val.size());
  var jan = ee.Image(listOfImages.get(0)).select(band_name).multiply(factor)
  var feb = ee.Image(listOfImages.get(1)).select(band_name).multiply(factor)
  var mar = ee.Image(listOfImages.get(2)).select(band_name).multiply(factor)
  var abr = ee.Image(listOfImages.get(3)).select(band_name).multiply(factor)
  var may = ee.Image(listOfImages.get(4)).select(band_name).multiply(factor)
  var jun = ee.Image(listOfImages.get(5)).select(band_name).multiply(factor)
  var jul = ee.Image(listOfImages.get(6)).select(band_name).multiply(factor)
  var ago = ee.Image(listOfImages.get(7)).select(band_name).multiply(factor)
  var sep = ee.Image(listOfImages.get(8)).select(band_name).multiply(factor)
  var oct = ee.Image(listOfImages.get(9)).select(band_name).multiply(factor)
  var nov = ee.Image(listOfImages.get(10)).select(band_name).multiply(factor)
  var dec = ee.Image(listOfImages.get(11)).select(band_name).multiply(factor)
  
var band_name = period + '_' + band_name
var geometry = basin

//Export images:
  var image = jan
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_1',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = feb
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_2',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = mar
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_3',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = abr
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_4',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = may
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_5',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = jun
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_6',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = jul
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_7',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = ago
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_8',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = sep
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_9',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = oct
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_10',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = nov
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_11',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });

  var image = dec
      //.unitScale(-2000, 10000)
      .reproject(EPSG, null, pixel_scale);
  Export.image.toDrive({
  image: image,
  description: band_name + '_12',
  scale: pixel_scale,
  region: geometry,
  folder: 'GEE',
  });
//////////////////////////////////////////////////
