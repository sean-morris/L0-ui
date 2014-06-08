/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('cc.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(context) {
    this.context = context;
    this.width = context.width;
    this.height = context.height;
    this.currentZoom = context.map.getZoom();
    this.center =[context.center.lng,context.center.lat];
    this.scale = 1;
    this.transMatrix = [1,0,0,1,0,0];
    this.projection = d3.geo.mercator().center(this.center)
                     .scale(this.scale)
                     .translate([this.width / 2, this.height / 2]);
    this.path = d3.geo.path().projection(this.projection);
    var bounds  = this.path.bounds(cc.Globals.DATA);
    var hscale  = scale*this.width  / (bounds[1][0] - bounds[0][0]);
    var vscale  = scale*this.height / (bounds[1][1] - bounds[0][1]);
    var scale   = (hscale < vscale) ? hscale : vscale;
    this.projection = d3.geo.mercator().center(this.center)
                                        .scale(scale)
                                        .translate([this.width / 2, this.height / 2]);
    this.path = this.path.projection(this.projection);
    this.svg = d3.select("#svg-overlay").append("svg")
                                        .attr("width", context.width)
                                        .attr("height", context.height);
    this.svg = this.svg.append("g");
    
    // draw default network
    this.drawNetwork(context.center, cc.Globals.DATA, cc.Globals.DATA.features[0].geometry.coordinates);
    var self = this;
    this.zoom = d3.behavior.zoom()
                  .on("zoom", function(){
                    self.zoomed(self);
                  }); 
    d3.select("#main-panel-body").call(this.zoom)
    google.maps.event.addListener(context.map, 'zoom_changed', function() {
        self.scale = self.currentZoom - self.context.map.getZoom() > 0 ? self.scale / 2 : self.scale * 2;
        self.currentZoom =  self.context.map.getZoom()
        self.zoom.event(self.svg);
    });
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
    this.projection = d3.geo.mercator().center(this.center)
                                        .scale(scale)
                                        .translate([this.width / 2, this.height / 2]);
    this.path = this.path.projection(this.projection);

    this.zoom = d3.behavior.zoom()
                             .scale(this.projection.scale() * 2 * Math.PI)
                             .translate([this.width / 2, this.height / 2])
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
    
    // console.log("here:" + d3.event.translate);
    // console.log("here:" + d3.event.scale);
    // console.log("trans:" + self.projection.translate());
    // console.log("zoom:" + self.zoom.translate());
    var t = d3.event.translate;    
    var scale = this.scale;

    // for (var i=0; i< self.transMatrix.length; i++)
    // {
        self.transMatrix[0] = scale;
        self.transMatrix[3] = scale;

    //}
    
    // self.transMatrix[4] += self.projection.translate()[0]  - Math.abs(t[0]);
    // self.transMatrix[5] += self.projection.translate()[1]  - Math.abs(t[1]);     
    // self.transMatrix[4] += self.projection.translate()[0]  - Math.abs(t[0]);
    // self.transMatrix[5] += self.projection.translate()[1]  - Math.abs(t[1]);     
   
    self.transMatrix[4] = ((1-scale)*self.context.width/2);
    self.transMatrix[5] = ((1-scale)*self.context.height/2);

    //self.projection.translate([self.projection.translate()[0] + self.transMatrix[4],self.projection.translate()[1] + self.transMatrix[5] ]);
    //self.zoom.translate([0,0]);
    //self.zoom.scale(1);
   
    newMatrix = "matrix(" +  self.transMatrix.join(' ') + ")";
    //newMatrix = "translate(" +  self.transMatrix[4] + "," + self.transMatrix[5] + ") scale("+ this.scale +")";

    d3.select("g").attr("transform", newMatrix);
    //g(this.svg.attr("transform"));
    
  },
  clear: function() {
    // remove links
    this.svg.selectAll("path").remove();
    // remove nodes
    this.svg.selectAll("circle").remove();
  }
});