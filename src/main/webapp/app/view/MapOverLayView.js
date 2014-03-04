/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('CC.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(context) {
     this.svgPlace =  context.svgPlace;
     this.overlay = context.overlay;
     this.projection = context.projection;
     this.latLngToPix = context.latLngToPix;
     this.latLngObj = context.latLngObj;
  },

  drawLinks: function(geoJson) {
    var overProjection = this.projection(this.overlay);
    var me = this;

    // Turn the overlay projection into a d3 projection
    var mapProjection = function(coordinates) {
      var coordinates = me.latLngObj(coordinates[1], coordinates[0]);
      var pixelCoordinates = me.latLngToPix(coordinates, overProjection);
      return [pixelCoordinates.x, pixelCoordinates.y];
    }
    
    translation = d3.geo.path().projection(mapProjection);
    
    me.layer.selectAll("path")
     .data(geoJson.features)
     .enter()
     .append("path")
     .attr("d", translation)
     .attr("stroke", "blue")
     .attr("fill", "none");     
  },

  drawNodes: function(points) {
    var overlayProjection = this.projection(this.overlay);
    var me = this;
    var marker =  me.layer.selectAll(".marker")
                  .data(points)
                  .each(transform)
                  .enter()
                  .append("svg:svg")
                  .each(transform)
                  .attr("class", "marker")
                  .append("svg:circle")
                  .attr("cx", "10")
                  .attr("cy", "10")
                  .attr("r", "8")
                  .attr("fill", "white")
                  .attr("stroke", "blue")
                  .attr("stroke-width", "3")
                 
    function transform(d) { 
      d = me.latLngObj(d[1], d[0]);
      d = me.latLngToPix(d, overlayProjection);
      return d3.select(this)
        .style("left", (d.x - 10) + "px")
        .style("top", (d.y - 10) + "px")
    }
  }
});
