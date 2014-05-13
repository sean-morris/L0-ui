/**
 * This panel holds the menu bar in the north section of the layout
 */
Ext.define('CC.view.MenuBarPanel', {
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
            xtype: 'MenuItem',
            text: "One",
          },
          {
            xtype: 'MenuItem',
            text: "Two",
          }
        ]
      },
      {
        xtype: 'splitbutton',
        text: 'Edit',
        cls: 'menubar-item',
        menu: [
          {
            xtype: 'MenuItem',
            text: "One",
          },
          {
            xtype: 'MenuItem',
            text: "Two",
          }
        ]
      },
      {
        xtype: 'splitbutton',
        text: 'Tools',
        cls: 'menubar-item',
        menu: [
          {
            xtype: 'MenuItem',
            text: "One",
          },
          {
            xtype: 'MenuItem',
            text: "Two",
          }
        ]
      } 
  ],
});