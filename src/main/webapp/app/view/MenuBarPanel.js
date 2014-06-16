/**
 * This panel holds the menu bar in the north section of the layout
 */
Ext.define('cc.view.MenuBarPanel', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.MenuBarPanel',
  border: false,
  padding: '2px',
  style: "background: #DDD;",
  items: [
      {
        xtype: 'splitbutton',
        text: 'File',
        cls: 'menubar-item',
        menu: [
          {
            xtype: 'menuitem',
            text: "Open Project",
            id: 'menu-open',
          },
          {
            xtype: 'menuitem',
            text: "Save Project",
            id: 'menu-save',
          },
          {
            xtype: 'menuitem',
            text: "Import Data",
          }
        ]
      },
      {
        xtype: 'splitbutton',
        text: 'Help',
        cls: 'menubar-item',
        menu: [
          {
            xtype: 'menuitem',
            text: "Documentation",
            cls: 'menu-item',
          },
          {
            xtype: 'menuitem',
            text: "Contact",
            cls: 'menu-item',
          },
          {
            xtype: 'menuitem',
            text: "Version Info",
            cls: 'menu-item',
          }
        ]
      },
  ],
});