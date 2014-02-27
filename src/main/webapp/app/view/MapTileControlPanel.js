/**
 * This panel holds the map tile controls which is layed on top of the main map panel. 
 *
 */
Ext.define('CC.view.MapTileControlPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.MapTileControl',
  height: 20,
  width: 75,
  layout: 'absolute',
  bodyStyle: {
    'z-index': 100000
  },
  html: 'Map Tiles',

  // define listener
  listeners: {
    'render': {
        fn: function() {
            this.body.on('click', this.toggleMenu, this);
        },
        single: true
    }
  },

  initComponent : function() {
    var me = this;

    me.callParent(arguments);

    // stylize positioning
    this.el = Ext.get('map-tile-control');
    this.el.setStyle({
        margin:'0',
        border:'0 none',
        top: '20px',
        right: '20px'
    });
    this.allowDomMove = false;
    this.renderTo = this.el;

  },

  toggleMenu : function() {
    // toggle display of tile menu
    menu = Ext.get('map-tile-control-menu');
    if (menu.getStyle('display') === 'none' ) {
      menu.setStyle('display');
    } else {
      menu.setStyle('display', 'none');
    }
  }

});