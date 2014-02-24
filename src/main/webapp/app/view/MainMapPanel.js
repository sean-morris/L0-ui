/**
 * This Map Panel View is a generic interface to handle map based rendering 
 * (ie. map sources, tiles, zoom levels, overlays, markers, etc) 
 *
 */
Ext.define('CC.view.MainMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainMapPanel',
    id: 'main-map-panel',

    requires: [
        'Ext.window.MessageBox'
    ],

    plain: true,
    gmapType: 'map',
    border: false,
    layout: 'fit',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    },

    afterFirstLayout: function() {
        var center = this.center;
        this.callParent();

        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }
    },

    createMap: function(center, marker) {
        var options = Ext.apply({}, this.mapOptions);

        options = Ext.applyIf(options, {
            zoom: 14,
            center: center,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        this.gmap = new google.maps.Map(this.body.dom, options);
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }
        //this.addLinkGoogle();
        this.addPathD3();
        this.gmap.setCenter(new google.maps.LatLng(37.6203,-122.07620000000001));
        Ext.each(this.markers, this.addMarker, this);
        this.fireEvent('mapready', this, this.gmap);
    },
    addLinkGoogle: function(){
        var enc = google.maps.geometry.encoding
        var o =  new google.maps.Polyline({
                    path: enc.decodePath("{urdFf_bhVyEtCwA~@"),
                    map: this.gmap,
                    strokeColor: 'blue',
                    icons: [{
                      icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
                      fillColor: 'blue',
                      offset: '60%'
                    }],
                    strokeOpacity: 0.9,
                    strokeWeight: 7,
                  })
        return o;
    },
    addNodeD3: function(){
        var enc = google.maps.geometry.encoding
        var overlay = new google.maps.OverlayView();
        overlay.onAdd = function(){
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
        overlay.setMap(this.gmap);
  
    },
    addPathD3: function(){
        var enc = google.maps.geometry.encoding
        var overlay = new google.maps.OverlayView();
        overlay.onAdd = function(){
            var layer = d3.select(this.getPanes().overlayLayer).append("div")
                          .attr("height", "100%")
                          .attr("width", "100%")
                          .attr("class", "map-elements")
                overlay.draw = function(){
                    var projection = this.getProjection();
                    
                    var marker = layer.selectAll("svg")
                                  .data(enc.decodePath("m_sdF|ebhVaBdAkErC"))
                                  .enter().append("svg:svg")
                                  .attr("class", "line")
                                  .append("svg:path")
                                  .attr("d", line)
                                  .style("stroke", "blue")
                                  .style("stroke-width", "10")
                                 
                    function line(d){
                      d = new google.maps.LatLng(d.lat(), d.lng());
                      d = projection.fromLatLngToDivPixel(d);
                      d3.svg.line()
                        .x(function(d) { return d.x; })
                        .y(function(d) { return d.y; })
                        .interpolate("basis");
                    }
                };
        };
        overlay.setMap(this.gmap);
  
    },
    addMarker: function(marker) {
        marker = Ext.apply({
            map: this.gmap
        }, marker);

        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        var o =  new google.maps.Marker(marker);
        Ext.Object.each(marker.listeners, function(name, fn){
            google.maps.event.addListener(o, name, fn);
        });
        return o;
    },

    lookupCode: function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },

    onLookUpComplete: function(data, response, marker) {
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },

    afterComponentLayout: function(w, h) {
        this.callParent(arguments);
        this.redraw();
    },

    redraw: function() {
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }

});