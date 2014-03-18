/**
 * This is the map tile selection menu overlay. With menu
 * checkItem subcomponent.
 */
Ext.define('CC.view.MapTileControlMenu', {
  extend: 'Ext.menu.Menu',
  alias: 'widget.MapTileControlMenu',
  id: 'map-tile-control-menu',
  width: 150,
  height: 100,
  floating: false,

  bodyStyle: {
    'posotion' : 'absolute',
    'z-index': 100000
  },

  initComponent : function() {
    var me = this;

    // add menu check items, default tiles are Google Road
    Ext.applyIf(me, {
      items: [{
        xtype: 'MenuCheckItem',
        text: 'Google Road',
        map: CC.Globals.GOOGLE,
        mapType: google.maps.MapTypeId.ROADMAP,
        checked: true,
      },
      {
        xtype: 'MenuCheckItem',
        text: 'Google Hybrid',
        map: CC.Globals.GOOGLE,
        mapType: google.maps.MapTypeId.HYBRID
      },
      {
        xtype: 'MenuCheckItem',
        text: 'Google Satellite',
        map: CC.Globals.GOOGLE,
        mapType: google.maps.MapTypeId.SATELLITE
      },
      {
        xtype: 'MenuCheckItem',
        text: 'Nokia Road',
        map: CC.Globals.NOKIA,
        mapType: null
      }]
    });

    me.callParent(arguments);

    // stylize positioning
    this.el = Ext.get('map-tile-control-menu');
    this.el.setStyle({
        margin:'0',
        border:'0 none',
        top: '55px',
        right: '20px',
        position: 'absolute'
    });
    this.allowDomMove = false;
    this.renderTo = this.el;
  }
});