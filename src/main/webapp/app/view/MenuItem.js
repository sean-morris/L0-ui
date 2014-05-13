Ext.define('CC.view.MenuItem', {
  extend: 'Ext.menu.Item',
  alias: 'widget.MenuItem',
  cls: 'menu-item no-icon-menu',
  onClick: function(e) {
    var me = this;
    alert("clicked");
  }, 
  
});