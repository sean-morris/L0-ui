/**
 * Connected Corridors Main Application View Container
 *
 */
Ext.define('CC.view.MainAppView', {
  extend: 'Ext.container.Viewport',

  requires: [
    'Ext.panel.Panel',
    // Views
    'CC.view.NetworkSelectionWindow',
    'CC.view.MainMapPanel',
    'CC.view.MapTileControlPanel',
    'CC.view.MapTileControlMenu',
    'CC.view.MapOverLayView',
    'CC.view.MenuCheckItem',
    'CC.view.MenuCheckItem',
    'CC.view.MapOverLayView',
    'CC.view.LoginBarPanel',
    'CC.view.LoginView',
    // Controllers
    'CC.controller.MainMapController',
    'CC.controller.NetworkController',
    // Models
    'CC.model.UserModel',
    'CC.model.NetworkModel',
    // Stores
    'CC.store.Networks'
  ],
  layout: 'absolute',

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          xtype: 'LoginBarPanel'
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
            lat: 40.714448123932996,
            lng: -74.010074230999976
          },
        }
      ]
    });
    me.callParent(arguments);
  }
});