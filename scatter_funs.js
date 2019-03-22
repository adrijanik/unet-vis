/**
 * Functions for drawing the scatterplot
 */


function update_patches(im_ids) {
  var patch_sel = patches.selectAll(".patch")
      .data(im_ids, (d) => d);

  patch_sel.enter()
    .append("svg:image")
    .attrs({
      "x": 1800,
      "height": 100,
      "width": 100,
      "xlink:href": (d) => d
//      "src": (d) => d

    })
    .classed("patch", true);

  patch_sel.attr("y", (d, i) => (100 + 10) * i + 100);
  patch_sel.exit().remove();
}

function update_masks(im_ids) {
  var mask_sel = masks.selectAll(".mask")
      .data(im_ids, (d) => d);

  mask_sel.enter()
    .append("svg:image")
    .attrs({
      "x": 1910,
      "height": 100,
      "width": 100,
      "xlink:href": (d) => d
//      "src": (d) => d

    })
    .classed("mask", true);

  mask_sel.attr("y", (d, i) => (100 + 10) * i + 100);
  mask_sel.exit().remove();
}


function update_preds(im_ids) {
  var pred_sel = preds.selectAll(".pred")
      .data(im_ids, (d) => d);

  pred_sel.enter()
    .append("svg:image")
    .attrs({
      "x": 2020,
      "height": 100,
      "width": 100,
      "xlink:href": (d) => d
//      "src": (d) => d

    })
    .classed("pred", true);

  pred_sel.attr("y", (d, i) => (100 + 10) * i + 100);
  pred_sel.exit().remove();
}

function brushed() {
  var value = [];
  if (d3.event.selection) {
    var [[x0, y0], [x1, y1]] = d3.event.selection;
    var selected = points_data.filter(
      d => x0 <= scales.x(d.coords[0]) && scales.x(d.coords[0]) < x1 &&
        y0 <= scales.y(d.coords[1]) && scales.y(d.coords[1]) < y1
    ).slice(0,8);
  }
  update_patches(selected.map((d) => d.patch_path_web));
  update_masks(selected.map((d) => d.mask_path_web));
  update_preds(selected.map((d) => d.pred_path_web));

}


