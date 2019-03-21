/**
 * Experiment Visualizing Errors in Activation Space
 */

var points = d3.select("#points"),
    heatmap = d3.select("#heatmap"),
    masks = d3.select("#masks"),
    preds = d3.select("#preds"),
    patches = d3.select("#patches");

var scales = {
  "x": d3.scaleLinear()
    .domain([-16, 16])
    .range([0, 2000]),
  "y": d3.scaleLinear()
    .domain([-16, 16])
    .range([0, 1000]),
  "color": d3.scaleSequential(d3.interpolateRdBu)//PiYG)
    .domain([0, 1])
};


var svg = d3.select("#svg-quant");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(132,900)");

var legendLinear = d3.legendColor()
  .shapeWidth(35)
  .shapeHeight(30)
  .cells([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0])
  .orient('horizontal')
  .scale(scales.color);

svg.select(".legendLinear")
  .call(legendLinear);

// draw the scatterplot points
points.selectAll("circle")
  .data(points_data)
  .enter()
  .append("circle")
  .attrs({
    "cx": (d) => scales.x(d.coords[0]),
    "cy": (d) => scales.y(d.coords[1]),
    "r": 3,
    "fill": (d) => scales.color(d.iou),
    "stroke": "black",
    "stroke-width": 1
  });

// draw the background heatmap
var ux = [... new Set(hm_data.map((d) => d.coords[0]))],
    uy = [... new Set(hm_data.map((d) => d.coords[1]))];


heatmap.selectAll("rect")
  .data(hm_data).enter()
  .append("rect")
  .attrs({
    "x": (d) => scales.x(d.coords[0]),
    "y": (d) => scales.y(d.coords[1]),
    "width": scales.x(ux[1]) - scales.x(ux[0]),
    "height": scales.y(uy[1]) - scales.y(uy[0]),
    "fill": (d) => scales.color(d.iou),
    "opacity": 0.7
  });


// allows interactivity with points
var brush = d3.brush()
    .extent([[140, 100], [1950, 1000]])
    .on("start brush end", brushed);
d3.select("#brush").call(brush);


