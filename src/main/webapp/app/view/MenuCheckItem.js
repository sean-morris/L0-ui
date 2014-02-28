/**
 * Extend default menu checked item component to
 * override setChecked method so that only one item 
 * can be checked at a time.
 */
Ext.define('CC.view.MenuCheckItem', {
  extend: 'Ext.menu.CheckItem',
  alias: 'widget.MenuCheckItem',
  onClick: function(e) {
    var me = this;
    if (!me.disabled && !me.checkChangeDisabled && !(me.checked && me.group)) {
      me.setSingleChecked(!me.checked);
    }
  }, 
  setSingleChecked: function(checked, suppressEvents) {
    var me = this;

    // only check item if it is not already checked
    if (me.checked === false) {
      var parent = Ext.getCmp('map-tile-control-menu');
      // set all items within map tile control menu to not be checked
      var items = parent.items.items;

      // ensure all other check items are unchecked
      for (var i=0; i < items.length; i++) {
        items[i].setChecked(false);
      }
      
      // check selected checkbox
      me.setChecked(true);

      // fire event to change map tiles
      CC.util.EventManager.fireEvent('app:change-map-tile', me);
      CC.util.EventManager.fireEvent('app:load-network', 478);
    }
  }
});