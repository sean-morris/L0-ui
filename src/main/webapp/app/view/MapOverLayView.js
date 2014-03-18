/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('CC.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(context) {
     var width = context.width;
     var height = context.height;
     this.center =[context.center.lng,context.center.lat];
     var scale = 10;
     this.projection = d3.geo.mercator().center(this.center)
                       .scale(scale)
                       .translate([width / 2, height / 2]);
      this.path = d3.geo.path().projection(this.projection);
      var bounds  = this.path.bounds(CC.util.Constants.DATA);
      var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
      var scale   = (hscale < vscale) ? hscale : vscale;
      // var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
      //                     height - (bounds[0][1] + bounds[1][1])/2];
       
      this.projection = d3.geo.mercator().center(this.center)
                                          .scale(scale)
                                          .translate([width / 2, height / 2]);
      this.path = this.path.projection(this.projection);
      this.svg = d3.select("#svg-overlay").append("svg")
                                          .attr("width", context.width)
                                          .attr("height", context.height);
     this.zoom = d3.behavior.zoom()
                             .scale(this.projection.scale() * 2 * Math.PI)
                             //.scaleExtent([1 << 11, 1 << 14])
                             //.translate([width / 2, height / 2])
                             .translate([context.width - this.center[0], context.height - this.center[1]])
                             .on("zoom", this.zoomed);
    this.svg.call(this.zoom);
    this.drawLinks(CC.util.Constants.DATA)
    this.drawNodes(CC.util.Constants.DATA.features[0].geometry.coordinates)
      
  },

  drawLinks: function(geoJson) {
    this.vector = this.svg.append("path");
    this.vector.attr("d", this.path(geoJson.features[0]))
                .attr("stroke", "blue")
                .attr("fill", "none");  
    //this.zoomed();
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
  zoomed: function() {
    console.log("sdf");
    this.vector
        .attr("transform", "translate(" + this.zoom.translate() + ")")
        .attr("webkit-transform", "translate(" + this.zoom.translate() + ")")
         .style("stroke-width", 3);
         //scale(" + this.zoom.scale() + ")")
   }
});