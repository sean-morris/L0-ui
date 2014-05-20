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
            text: "Open Project",
            func: function(){
              new CC.view.FileUploadFormView();
            }
          },
          {
            xtype: 'MenuItem',
            text: "Save Project",
          },
          {
            xtype: 'MenuItem',
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
            xtype: 'MenuItem',
            text: "Documentation",
          },
          {
            xtype: 'MenuItem',
            text: "Contact",
          },
          {
            xtype: 'MenuItem',
            text: "Version Info",
          }
        ]
      },
  ],
});