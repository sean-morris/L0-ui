/**
 * Connected Corridors Main Application View Container
 *
 */
Ext.define('cc.view.MainAppView', {
  extend: 'Ext.container.Viewport',

  requires: [
    'Ext.panel.Panel',
    // Views
    'cc.view.FormBasicView',
    'cc.view.NetworkSelectionWindow',
    'cc.view.MainMapPanel',
    'cc.view.MapTileControlPanel',
    'cc.view.MapTileControlMenu',
    'cc.view.MapOverLayView',
    'cc.view.MenuCheckItem',
    'cc.view.MenuCheckItem',
    'cc.view.MapOverLayView',
    'cc.view.LoginBarPanel',
    'cc.view.LoginView',
    'cc.view.MenuBarPanel',
    'cc.view.MenuItem',
    'cc.view.TreeView',
    
    // Controllers
    'cc.controller.MainMapController',
    'cc.controller.NetworkController',
    'cc.controller.LoginController',
    
    // Models
    'cc.model.UserModel',
    'cc.model.NetworkModel',
    'cc.model.Calibration',
    
    // Stores
    'cc.store.Networks',
    'cc.store.Calibrations',
    
    //util
    'cc.util.GenerateNavigation'
  ],
  layout: 'border',
  bodyBorder: false,
  defaults: {
    collapsible: true,
    split: true,
    bodyPadding: 15
  },
  initComponent: function() {
    this.items = [
        {
          region:'north',
          bodyPadding: 0,
          split: false,
          collapsible: false,
          height: '20px',
          margins: '5 5 0 5',
          items : [
            {
              xtype: 'MenuBarPanel'
            }
          ]
        },
        {
          title: 'Navigation',
          id: 'nav-accordian',
          region:'west',
          floatable: false,
          margins: '5 0 5 5',
          width: '20%',
          minWidth: 100,
          maxWidth: 250,
          layout: {
                 type: 'accordion',
                 multi: true,
          },
          defaults: {
            collapsed: true,
            hideCollapseTool: false
          },
          items: cc.util.GenerateNavigation.getPanelTitles()
        },
        {
          title: 'Forms and Reporting',
          region:'east',
          floatable: false,
          margins: '5 5 5 0',
          width: '40%',
          items: [
            {
              xtype: 'FormBasicView'
            }
          ]
        },
        {
          title: 'Map',
          region:'center',
          collapseDirection: 'left',
          floatable: false,
          margins: '5 0 5 0',
          layout: 'fit',
          width: '40%',
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

              // set default map center to Berkeley co-ordinates
              center: {
                lat: 40.714448123932996,
                lng: -74.010074230999976
              },
             
            }
          ]
        },
    ];
    this.createStores();
    this.callParent(arguments);
  },
  createStores: function(){
    Ext.create('cc.store.Calibrations');
  }
  
});