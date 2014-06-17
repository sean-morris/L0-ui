/**
 * This Map Panel View is a generic interface to handle map based rendering 
 * (ie. map sources, tiles, zoom levels, overlays, markers, etc) 
 *
 */
Ext.define('cc.view.MainMapPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.MainMapPanel',
  xtype: 'MainMapPanel',
  requires: [
    'Ext.window.MessageBox',
  ],
  gmapType: 'map',
  height: 660,
  width: 558,
  id: 'main-panel',
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
        mapTypeControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.DEFAULT,
          position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    new google.maps.Map(this.body.dom, options);
  }
});