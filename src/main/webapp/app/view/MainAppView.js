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
    'CC.controller.LoginController',
    // Models
    'CC.model.UserModel',
    'CC.model.NetworkModel',
    // Stores
    'CC.store.Networks'
  ],
  layout: 'border',
  bodyBorder: false,
  defaults: {
    collapsible: true,
    split: true,
    bodyPadding: 15
  },
  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          title: 'Tree',
          region:'west',
          floatable: false,
          margins: '5 0 5 5',
          width: '20%',
          minWidth: 100,
          maxWidth: 250,
          html: 'Secondary content like navigation links could go here'
        },
        {
          title: 'Forms and Reporting',
          region:'east',
          floatable: false,
          margins: '5 5 5 0',
          width: '20%',
          minWidth: 100,
          maxWidth: 250,
          html: 'Secondary content like navigation links could go here'
        },
        {
          title: 'Map',
          region:'center',
          floatable: false,
          margins: '5 0 5 0',
          layout: 'fit',
          width: '60%',
          items: [
            // {
            //              //xtype: 'LoginBarPanel'
            //            },
            //            {
            //              //xtype: 'MapTileControl'
            //            },
            //            {
            //              //xtype: 'MapTileControlMenu'
            //            },
            {
              xtype: 'MainMapPanel',
              //height: 822,
              //width: 1217,
              // set default map center to Berkeley co-ordinates
              center: {
                lat: 40.714448123932996,
                lng: -74.010074230999976
              },
             
            }
          ]
        },
      ]
    });
    me.callParent(arguments);
  }
});