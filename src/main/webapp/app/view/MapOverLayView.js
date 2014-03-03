/**
 * This OverLayView is a generic interface to handle overlays on any
 * of map (e.g. Google, Nokia, etc).
 *
 */
Ext.define('CC.view.MapOverLayView', {
  alias: 'widget.MapOverLayView',
  
  constructor: function(map) {
     this.map = map;
     this.overlay = new google.maps.OverlayView();
     this.setMap();
   },

  add : function(){
    var me = this;
    // Handle Google Overlay onAdd event
    this.overlay.onAdd  = function() {
      var layer = d3.select(this.getPanes().overlayLayer)
                    .append("div")
                    .attr('class', 'svg-overlay');
      me.svg = layer.append("svg");

    };
    this.overlay.draw = function() { 
      // Draw Links and Nodes
       console.log("DRAW");
    };
    // Handle Google Overlay on Remove Event
    this.overlay.onRemove = function() {
      // Remove overlay div from DOM
      d3.select(".svg-overlay").remove();
    }
  },

  setMap: function(){
    this.add();
    this.overlay.setMap(this.map);
  },

  drawL : function(links) {
    var me = this;
    var scopeLinks = links;
    this.drawLinks(links);

    this.overlay.draw = function() { 
      // remove old overlay
      d3.select(".svg-overlay").selectAll("path").remove();
      // Draw Links and Nodes
      me.drawLinks(scopeLinks); 
    };
  },

  drawLinks: function(links) {
    for (var i in links) {
      var coordinates = new Array();
      if (links != null && links != undefined) {
        for(var j in links[i].position.point) {
          var lat = parseFloat(links[i].position.point[j].lat);
          var lng = parseFloat(links[i].position.point[j].lng);
          coordinates.push([lng, lat]);
        }
        // construct d3 geo feature object
        feature = {
                    "type": "FeatureCollection",
                      "features": [
                        {
                          "type": "Feature",
                          "properties": {
                            "link_id": links[i].id
                          },
                          "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates
                          }
                        }
                      ]
                  };
        // draw links path and attack event to id.
        this.drawPath(feature);
      }
    }  
  },

  drawPath: function(feature){
    var overlayProjection = this.overlay.getProjection();
    // Turn the overlay projection into a d3 projection
    var mapProjection = function(point) {
      var googleCoordinates = new google.maps.LatLng(point[1], point[0]);
      var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
      return [pixelCoordinates.x, pixelCoordinates.y];
    }

    translation = d3.geo.path().projection(mapProjection);

    this.svg.append("path")
     .data(feature.features)
     .attr("d", translation)
     .attr("stroke", "blue")
     .attr("fill", "none");
  },

  addNodeD3: function(){
   /* var enc = google.maps.geometry.encoding
    var overlay = new google.maps.OverlayView();
    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayLayer).append("div")
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("class", "map-elements")
      overlay.draw = function(){
        var projection = this.getProjection();
        
        var marker = layer.selectAll("svg")
                      .data(enc.decodePath("m_sdF|ebhVaBdAkErC"))
                      .each(transform)
                      .enter().append("svg:svg")
                      .each(transform)
                      .attr("class", "marker")
                      .append("svg:circle")
                      .attr("cx", "10")
                      .attr("cy", "10")
                      .attr("r", "8")
                      .attr("fill", "white")
                      .attr("stroke", "blue")
                      .attr("stroke-width", "3")
                     
        function transform(d){
           d = new google.maps.LatLng(d.lat(), d.lng());
           d = projection.fromLatLngToDivPixel(d);
           return d3.select(this)
            .style("left", d.x + "px")
            .style("top", d.y + "px")
        }
      };
    };
    overlay.setMap(this.gmap);*/
  }

});
