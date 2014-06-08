Ext.define('cc.view.MenuItem', {
  extend: 'Ext.menu.Item',
  alias: 'widget.MenuItem',
  cls: 'menu-item',
  onClick: function(e) {
    var me = this;
    new cc.view.FileUploadForm();
  }, 
  
});