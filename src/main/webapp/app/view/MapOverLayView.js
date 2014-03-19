/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('CC.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(context) {
    this.width = context.width;
    this.height = context.height;
     
    this.svg = d3.select("#svg-overlay").append("svg")
                                          .attr("width", context.width)
                                          .attr("height", context.height);
     
    // draw default network
    this.drawNetwork(context.center, CC.Globals.DATA, CC.Globals.DATA.features[0].geometry.coordinates);
      
  },

  drawNetwork:function(center, links, nodes) {
    // set center and scale
    this.center =[center.lng,center.lat];
    var scale = 10;
    this.projection = d3.geo.mercator().center(this.center)
                     .scale(scale)
                     .translate([this.width / 2, this.height / 2]);
    this.path = d3.geo.path().projection(this.projection);
    var bounds  = this.path.bounds(links);
    var hscale  = scale*this.width  / (bounds[1][0] - bounds[0][0]);
    var vscale  = scale*this.height / (bounds[1][1] - bounds[0][1]);
    var scale   = (hscale < vscale) ? hscale : vscale;
    // var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
    //                     height - (bounds[0][1] + bounds[1][1])/2];
     
    this.projection = d3.geo.mercator().center(this.center)
                                        .scale(scale)
                                        .translate([this.width / 2, this.height / 2]);
    this.path = this.path.projection(this.projection);

    this.zoom = d3.behavior.zoom()
                             .scale(this.projection.scale() * 2 * Math.PI)
                             //.scaleExtent([1 << 11, 1 << 14])
                             //.translate([width / 2, height / 2])
                             .translate([this.width - this.center[0], this.height - this.center[1]])
                             .on("zoom", this.zoomed);

    this.svg.call(this.zoom);
    // draw links and nodes
    if (links != null && links != undefined) {
      this.drawLinks(links);
    }
    if (nodes != null && nodes != undefined) {
      this.drawNodes(nodes);
    }
  },

  drawLinks: function(geoJson) {
    this.svg.selectAll("path")
     .data(geoJson.features)
     .enter()
     .append("path")
     .attr("d", this.path)
     .attr("stroke", "blue")
     .attr("fill", "none"); 
  },
  drawNodes: function(points) {
    var me = this;  
    var marker =  this.svg.selectAll("circle")
                  .data(points)
                  .each(transform)
                  .enter()
                  .append("svg:circle")
                  .each(transform)
          
    function transform(d) { 
      d = me.projection(d);
      return d3.select(this)
        .attr("cx", d[0])
        .attr("cy", d[1])
        .attr("r", "8")
        .attr("fill", "white")
        .attr("stroke", "blue")
        .attr("stroke-width", "3");
    }
  },
  clear: function() {
    // remove links
    this.svg.selectAll("path").remove();
    // remove nodes
    this.svg.selectAll("circle").remove();
  },
  zoomed: function() {
    console.log("sdf");
    this.vector
        .attr("transform", "translate(" + this.zoom.translate() + ")")
        .attr("webkit-transform", "translate(" + this.zoom.translate() + ")")
         .style("stroke-width", 3);
         //scale(" + this.zoom.scale() + ")")
   }
});