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
  id: 'main-map-tile',

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
      this.createGoogleMap(center);
    } else {
      Ext.Error.raise('center is required');
    }
  },
  createGoogleMap: function(center) {
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
    this.map = new google.maps.Map(this.body.dom, options);
    
    this.addGoogleMapsOverLay();
    this.fireEvent('mapready', this, this.map);
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
    context.overlay.setMap(this.map);
  },
  createNokiaMap: function(center){
    nokia.Settings.set("app_id", "ZvWa3zRHnu5OQ2W20jtc");
    nokia.Settings.set("app_code", "OHJaz7XQiCjo4oOTdapgSw");
    this.map = new nokia.maps.map.Display(this.body.dom, {
      // Initial center and zoom level of the map
      center: center,
      zoomLevel: 12,
      // We add the behavior component to allow panning / zooming of the map
      components:[new nokia.maps.map.component.Behavior()]
    });
    this.map.type =  CC.util.Constants.NOKIA;
    this.addNokiaMapsOverLay();
    
  },
  addNokiaMapsOverLay: function(){
    // var me = this;
    // var context = {
    //      map: this.map,
    //      svgPlace : function(over){ return this.body.dom },
    //      overlay: new google.maps.OverlayView(),
    //      projection: function(over){ return over.getProjection() },
    //      latLngToPix: function(c, map){ return map.geoToPixel(c); },
    //      latLngObj: function(lat,lng){ return new google.maps.LatLng(lat, lng) },
    // }
    // this.overlay = new CC.view.MapOverLayView(context);    
    // this.overlay.layer = d3.select(("#" + this.body.dom.id))
    //                      .select(".nma_p2d_0_markerLayer");
    //                      // .append("div")
    //                      // .attr('class', 'svg-overlay');
    // var data = me.line2_geoJson.features
    // this.overlay.drawNokiaMarkers(data[0].geometry.coordinates, this.map);
    //   
    // var center =  new nokia.maps.geo.Coordinate(40.738728,-73.99236);
    // var marker = new nokia.maps.map.StandardMarker(center);
    // this.map.objects.add(marker);
  },
  addMarker: function(marker) {
    marker = Ext.apply({
        map: this.map
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
    var map = this.map;
    if (map) {
      google.maps.event.trigger(map, 'resize');
    }
  },
  changeMaps: function(mapTile) {
    var map = mapTile.map;
    this.clearMapTiles(map);
    if (mapTile != null && mapTile != undefined && map ==  CC.util.Constants.GOOGLE) {
      if(this.map.type != map)
        this.createGoogleMap(this.center);
      this.map.setMapTypeId(mapTile.mapType);
    }
    else
      this.createNokiaMap(this.center)
  },
  clearMapTiles: function(map){
    if(this.map.type != map){
      var dom = "#" + this.body.dom.id + " *";
      d3.select(dom).remove();
    }
  },
  setCenter: function(lat, lng) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
    // TODO handle for other maps
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