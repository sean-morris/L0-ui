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
    'CC.view.MenuCheckItem'
  ],
  layout: 'absolute',

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          xtype: 'MapTileControl'
        },
        {
          xtype: 'MapTileControlMenu'
        },
        {
          xtype: 'MainMapPanel',
          center: {
            lat: 40.718563000933024,
            lng: -74.00703
          },
          markers: [{
            lat: 42.339641,
            lng: -71.094224,
            title: 'Boston Museum of Fine Arts',
            listeners: {
              click: function(e){
                  Ext.Msg.alert('It\'s fine', 'and it\'s art.');
              }
            }
          },{
            lat: 42.339419,
            lng: -71.09077,
            title: 'Northeastern University'
          }]
        }
      ]
    });
    me.callParent(arguments);
  }
});