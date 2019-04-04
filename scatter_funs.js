/**
 * Functions for drawing the scatterplot
 */


function update_images(im_ids, name, plural, offset) {
  currentWidth = parseInt(d3.select('#div_main').style('width'), 10)
  var initial = ratio*scales.x(Math.max.apply(null, values0)) + ((currentWidth  -  (ratio *currentWidth))/3 - 115)

  var sel = eval(name + plural).selectAll("." + name)
    .data(im_ids, (d) => d)
    .enter()
    .append("svg:image")
    .attrs({
      "x": initial + offset + 30,
      "height": 100,
      "width": 100,
      "xlink:href": (d) => d

    })
    .classed(name, true);

    sel.attr("y", function(d, i) { return (100 + 10) * i + 100});    
    return sel
}


function brushed() {
  var value = [];
  if (d3.event.selection) {
    var patch = patches.selectAll(".patch");
    patch.remove();
    var mask = masks.selectAll(".mask");
    mask.remove();
    var pred = preds.selectAll(".pred");
    pred.remove();

    var [[x0, y0], [x1, y1]] = d3.event.selection;
    var selected = points_data.filter(
      d => x0 <= ratio*scales.x(d.coords[0]) && ratio*scales.x(d.coords[0]) < x1 &&
        y0 <= scales.y(d.coords[1]) && scales.y(d.coords[1]) < y1
    ).slice(0,8);
  }

  patch_sel = update_images(selected.map((d) => d.patch_path_web), 'patch',"es", 0);
  mask_sel = update_images(selected.map((d) => d.mask_path_web), 'mask', "s", 110);
  pred_sel = update_images(selected.map((d) => d.pred_path_web), 'pred', "s", 220);
  patch_sel.exit();
  pred_sel.exit();
  mask_sel.exit(); 
}

