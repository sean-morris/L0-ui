/**
 * This Map Panel View is a generic interface to handle map based rendering 
 * (ie. map sources, tiles, zoom levels, overlays, markers, etc) 
 *
 */
Ext.define('CC.view.MainMapPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.MainMapPanel',
  xtype: 'MainMapPanel',

  requires: [
    'Ext.window.MessageBox',
  ],

  plain: true,
  gmapType: 'map',
  border: false,
  layout: 'absolute',
  height: screen.availHeight,
  width: screen.availWidth,
  id: 'main-panel',

  initComponent: function() {
    var me = this;

    // set up event Listeners
    CC.util.EventManager.on('app:change-map-tile', this.changeMaps, this);

    me.callParent(arguments);
  },

  afterFirstLayout: function() {
    var center = this.center;
    this.callParent();

    if (center) {
      this.createMap(center);
    } else {
      Ext.Error.raise('center is required');
    }
  },

  createMap: function(center) {
    var options = Ext.apply({}, this.mapOptions);
    options = Ext.applyIf(options, {
        zoom: 12,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADWAY,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.DEFAULT,
          position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    this.gmap = new google.maps.Map(this.body.dom, options);
    
    this.addGoogleMapsOverLay();
    this.fireEvent('mapready', this, this.gmap);
  },

  addGoogleMapsOverLay: function(){
    var context = {
      svgPlace : function(over){ return over.getPanes().overlayLayer },
      overlay: new google.maps.OverlayView(),
      projection: function(over){ return over.getProjection() },
      latLngToPix: function(c, proj){ return proj.fromLatLngToDivPixel(c); },
      latLngObj: function(lat,lng){ return new google.maps.LatLng(lat, lng) },
    }
    
    this.overlay = new CC.view.MapOverLayView(context);    
    var me = this;
    context.overlay.onAdd  = function() {
      var layer = d3.select(this.getPanes().overlayLayer)
                    .append("div")
                    .attr('class', 'svg-overlay');
      me.overlay.layer = layer.append("svg");
    };
    context.overlay.draw = function() {
      //me.overlay.drawNodes(data[0].geometry.coordinates);
      d3.select(".svg-overlay").selectAll("path").remove();
      // Draw Links and Nodes if they exist
      if (me.links != null && me.links != undefined) {
        me.overlay.drawLinks(me.links); 
      }
    };
    context.overlay.setMap(this.gmap);
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
  },

  changeMaps: function(mapTile) {
    // add functionality to change nokia map tiles
    if (mapTile != null && mapTile != undefined) {
      this.gmap.setMapTypeId(mapTile.mapType);
    }
  },
  
  setCenter: function(lat, lng) {
    this.gmap.setCenter(new google.maps.LatLng(lat, lng));
    // TODO handle for other maps
  },

  changeMaps: function(mapTile) {
    // add functionality to change nokia map tiles
    if (mapTile != null && mapTile != undefined) {
      //this.gmap.setMapTypeId(mapTile.mapType);
    }
  },

  loadNetwork: function(network) {
    var me = this;
    // hack to get network center, just take first point of bounding box
    var lat = network.center.lat;
    var lng = network.center.lng;
    // set center
    this.setCenter(lat, lng);
    // set links
    this.links = network.links;
  }
});