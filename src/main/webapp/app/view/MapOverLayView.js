/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('CC.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(context) {
    this.fact = 0;
     this.context = context;
     var width = context.width;
     var height = context.height;
     this.center =[context.center.lng,context.center.lat];
     var scale = 1;
     this.projection = d3.geo.mercator().center(this.center)
                       .scale(scale)
                       .translate([width / 2, height / 2]);
      this.path = d3.geo.path().projection(this.projection);
      var bounds  = this.path.bounds(CC.Globals.DATA);
            var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
            var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
            var scale   = (hscale < vscale) ? hscale : vscale;
      // var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
      //                     height - (bounds[0][1] + bounds[1][1])/2];
      
      this.transMatrix = [1,0,0,1,0,0];
      
      this.projection = d3.geo.mercator().center(this.center)
                                          .scale(scale)
                                          .translate([width / 2, height / 2]);
      this.path = this.path.projection(this.projection);
      this.svg = d3.select("#svg-overlay").append("svg")
                                          .attr("width", context.width)
                                          .attr("height", context.height);
     this.svg = this.svg.append("g")
     this.svg.attr("transform", "matrix("+ this.transMatrix.join(",")  +")");
      this.svg.attr("transform-origin", "0 0");     
     var self = this;

     this.zoom = d3.behavior.zoom()
                  .on("zoom", function(){
                    self.zoomed(self);
                    });   
    d3.select("#main-panel-body").call(this.zoom)
    this.drawLinks(CC.Globals.DATA)
    this.drawNodes(CC.Globals.DATA.features[0].geometry.coordinates)
      
  },

  drawLinks: function(geoJson) {
     this.vector = this.svg.selectAll("path")
                          .data(geoJson.features)
                          .each()
                          .attr("d", this.path)
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
  zoomed: function(self) {
    
    console.log("here:" + d3.event.translate);
    console.log("here:" + d3.event.scale);
    console.log("trans:" + self.projection.translate());
    console.log("zoom:" + self.zoom.translate());
    var t = d3.event.translate;
    
    var scale = 1 + 1.0/20;

    for (var i=0; i< self.transMatrix.length; i++)
    {
      self.transMatrix[i] *= scale;
    }
    self.transMatrix[4] += self.projection.translate()[0]  - Math.abs(t[0]);
    self.transMatrix[5] += self.projection.translate()[1]  - Math.abs(t[1]);     
    self.transMatrix[4] += ((1-scale)*self.context.width/2);
    self.transMatrix[5] += ((1-scale)*self.context.height/2);
    self.projection.translate([self.projection.translate()[0] + self.transMatrix[4],self.projection.translate()[1] + self.transMatrix[5] ]);
    self.zoom.translate([0,0]);
   
    newMatrix = "matrix(" +  self.transMatrix.join(' ') + ")";
    d3.select("g").attr("transform", newMatrix);
    console.log(this.svg.attr("transform"));
    
   }
        
});