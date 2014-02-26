/**
 * This is the map tile selection menu overlay. With menu
 * checkItem subcomponent.
 */
Ext.define('CC.view.MapTileControlMenu', {
  extend: 'Ext.menu.Menu',
  alias: 'widget.MapTileControlMenu',
  id: 'map-tile-control-menu',
  width: 150,
  height: 80,
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
        checked: true,
      },
      {
        xtype: 'MenuCheckItem',
        text: 'Google Satellite',
      },
      {
        xtype: 'MenuCheckItem',
        text: 'Nokia Road',
      }]
    });

    me.callParent(arguments);

    // stylize positioning
    this.el = Ext.get('map-tile-control-menu');
    this.el.setStyle({
        margin:'0',
        border:'0 none',
        top: '40px',
        right: '20px',
        position: 'absolute'
    });
    this.allowDomMove = false;
    this.renderTo = this.el;
  }
});