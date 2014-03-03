/**
 * Connected Corridors Main Application View Container
 *
 */
Ext.define('CC.view.MainAppView', {
  extend: 'Ext.container.Viewport',

  requires: [
    'Ext.panel.Panel',
    'CC.view.MainMapPanel',
    'CC.view.MapTileControlPanel',
    'CC.view.MapTileControlMenu',
    'CC.view.MenuCheckItem',
    'CC.controller.MainMapController',
    'CC.view.MapOverLayView'
  ],
  layout: 'absolute',

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          xtype: 'LoginView'
        },
        {
          xtype: 'MapTileControl'
        },
        {
          xtype: 'MapTileControlMenu'
        },
        {
          xtype: 'MainMapPanel',
          // set default map center to Berkeley co-ordinates
          center: {
            lat: 37.8679933092856,
            lng: -122.29768037796
          },
        }
      ]
    });
    me.callParent(arguments);
  }
});