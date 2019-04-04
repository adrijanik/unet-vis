/**
 * Experiment Visualizing Errors in Activation Space
 */

var Svg = d3.select("#div_main")
  .append("svg")
  .attr("height", 1000)


var scales = {
  "x": d3.scaleLinear()
    .domain([-16, 16])
    .range([0, 2000]),
  "y": d3.scaleLinear()
    .domain([-16, 16])
    .range([0, 1000]),
  "color": d3.scaleSequential(d3.interpolateRdBu)
    .domain([0, 1])
};

var ratio = 0.8;

var groups = ["heatmap", "points", "masks", "preds", "patches", "svg-quant", "brush"]
Svg.selectAll("g")
  .data(groups).enter()
  .append("g")
  .attr("id", (d) => d)

var points = Svg.select("#points"),
    heatmap = Svg.select("#heatmap"),
    masks = Svg.select("#masks"),
    preds = Svg.select("#preds"),
    patches = Svg.select("#patches");

/**
 * Add legend to the chart
 */

var legend = Svg.select("#svg-quant");

legend.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(132,900)");

var legendLinear = d3.legendColor()
  .shapeWidth(35)
  .shapeHeight(30)
  .cells([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0])
  .orient('horizontal')
  .scale(scales.color);

legend.select(".legendLinear")
  .call(legendLinear);

// draw the scatterplot points
var points = points.selectAll("circle")
  .data(points_data)
  .enter()
  .append("circle")
  .attrs({
    "cy": (d) => scales.y(d.coords[1]),
    "r": 3,
    "fill": (d) => scales.color(d.iou),
    "stroke": "black",
    "stroke-width": 1
  });


// draw the background heatmap
var ux = [... new Set(hm_data.map((d) => d.coords[0]))],
    uy = [... new Set(hm_data.map((d) => d.coords[1]))];

var heatmap = heatmap.selectAll("rect")
  .data(hm_data).enter()
  .append("rect")
  .attrs({
    "y": (d) => scales.y(d.coords[1]),
    "height": scales.y(uy[1]) - scales.y(uy[0]),
    "fill": (d) => scales.color(d.iou),
    "opacity": 0.7
  });


var values0 = points_data.map(function(dict){
  return dict['coords'][0];
}); 
var values1 = points_data.map(function(dict){
  return dict['coords'][1];
}); 


// A function that finishes to draw the chart for a specific device size.
function drawChart() {

  var patch = patches.selectAll(".patch");
  patch.remove();
  var mask = masks.selectAll(".mask");
  mask.remove();
  var pred = preds.selectAll(".pred");
  pred.remove();

	
  // get the current width of the div where the chart appear, and attribute it to Svg
  currentWidth = parseInt(d3.select('#div_main').style('width'), 10)
  Svg.attr("width", currentWidth - 20)

  // Update the X scale 
  scales["x"].range([ 0, currentWidth]);
  heatmap.attrs({"x": (d) => ratio*scales.x(d.coords[0]),
    "width": ratio*scales.x(ux[1]) - ratio*scales.x(ux[0])
  })

  points.attrs({"cx": (d) => ratio*scales.x(d.coords[0])})
  // allows interactivity with points
  var brush = d3.brush()
      .extent([[ratio*scales.x(Math.min.apply(null, values0)),scales.y(Math.min.apply(null, values1))], [ratio*scales.x(Math.max.apply(null, values0)),scales.y(Math.max.apply(null, values1))]])
      .on("start brush end", brushed);

  d3.select("#brush").call(brush);

}


//
// Initialize the chart
drawChart()

// Add an event listener that run the function when dimension change
window.addEventListener('resize', drawChart );


