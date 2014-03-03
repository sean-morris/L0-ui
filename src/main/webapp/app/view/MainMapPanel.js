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

    // add overlay to map
    this.overlayView = new CC.view.MapOverLayView(this.gmap);

    this.fireEvent('mapready', this, this.gmap);
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

  drawNetwork: function(network) {
    var me = this;
    // hack to get network center, just take first point of bounding box
    var lat = network.position.point[0].lat;
    var lng = network.position.point[0].lng;
    // set center
    this.setCenter(lat, lng);
    me.overlayView.drawL(network.LinkList.link);
  }

});