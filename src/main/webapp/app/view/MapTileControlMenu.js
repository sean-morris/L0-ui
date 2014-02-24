/**
 * This is the map tile selection menu overlay. 
 *
 */
Ext.define('CC.view.MapTileControlMenu', {
  extend: 'Ext.menu.Menu',
  alias: 'widget.MapTileControlMenu',
  width: 100,
  height: 110,
  floating: false,

  bodyStyle: {
    'posotion' : 'absolute',
    'z-index': 100000
  },

  items: [{
      xtype: 'menucheckitem',
      text: 'Google Map Tiles'
  },{
      xtype: 'menucheckitem',
      text: 'Google Satellite Tiles'
  },{
      xtype: 'menucheckitem',
      text: 'Nokia Map Tiles'
  }],

  initComponent : function() {
    var me = this;

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
  },
});