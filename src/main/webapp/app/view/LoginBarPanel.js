/**
 * This panel holds the map tile controls which is layed on top of the main map panel. 
 *
 */
Ext.define('cc.view.LoginBarPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.LoginBarPanel',
  height: 35,
  width: 75,
  layout: 'absolute',
  bodyStyle: {
    'z-index': 100000
  },
  title: 'Login',
  // define listener to toggle map tiles 
  listeners: {
    'render': {
        fn: function() {
            this.el.on('click', this.logIn, this);
        },
        single: true
    }
  },

  initComponent : function() {
    var me = this;

    me.callParent(arguments);

    // stylize positioning
    this.el = Ext.get('login-bar');
    this.el.setStyle({
        margin:'0',
        border:'0 none',
        top: '20px',
        right: '100px'
    });
    this.allowDomMove = false;
    this.renderTo = this.el;
  },
  // Function to open log screen into CC system
  logIn: function() {
    // open log in screen
    var loginWindow = new cc.view.LoginView();
  }
});