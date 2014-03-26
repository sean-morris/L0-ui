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
  height: window.innerHeight,
  width: window.innerWidth,
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
      this.createGoogleMap(center);
    } else {
      Ext.Error.raise('center is required');
    }
  },
  createGoogleMap: function(center) {
    var options = Ext.apply({}, this.mapOptions);
    options = Ext.applyIf(options, {
        zoom: 14,
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
    this.map.type =  CC.Globals.GOOGLE;
    var me = this;
    google.maps.event.addListener(this.map, 'idle', function(){
      google.maps.event.clearListeners(me.map, 'idle');
      var svgPlace = "#" + me.body.dom.id;
      svgPlace += " > div:first-child > div:first-child > div:first-child";
      
      me.addOverLay(svgPlace);

    });
    //is this doing anything?
    //this.fireEvent('mapready', this, this.mapReady());
  },
  createNokiaMap: function(center){
    nokia.Settings.set("app_id", "ZvWa3zRHnu5OQ2W20jtc");
    nokia.Settings.set("app_code", "OHJaz7XQiCjo4oOTdapgSw");
    this.map = new nokia.maps.map.Display(this.body.dom, {
      // Initial center and zoom level of the map
      center: center,
      zoomLevel: 14,
      // We add the behavior component to allow panning / zooming of the map
      components:[new nokia.maps.map.component.Behavior()]
    });
    this.map.type =  CC.Globals.NOKIA;
    
    var svgPlace = "#" + this.body.dom.id;
    svgPlace += " > div:first-child  > div:first-child > div:first-child";
    
    this.addOverLay(svgPlace);
  },
  addOverLay: function(svgPlace){
    d3.select("#svg-overlay").remove();

    d3.select(svgPlace)
        .append("div")
        .attr("id","svg-overlay")
        .style("height", this.height + "px")
        .style("width", this.width + "px");
        
    var context = {
      height: this.height,
      width: this.width,
      center: this.center,
      map: this.map
    }
    this.overlay = new CC.view.MapOverLayView(context);    
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
    if (mapTile != null && mapTile != undefined && map ==  CC.Globals.GOOGLE) {
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
    // clear old overlay
    this.overlay.clear();
    // hack to get network center, just take first point of bounding box
    var lat = network.center.lat;
    var lng = network.center.lng;
    var center = {};
    center.lat = lat;
    center.lng = lng;
    // set center
    this.setCenter(lat, lng);
    // set links
    this.links = network.links;
    // draw network on svg overlay
    this.overlay.drawNetwork(center, this.links, null);
  }
});