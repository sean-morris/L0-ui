/**
 * Connected Corridors Main Application View Container
 *
 */
Ext.define('cc.view.MainAppView', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.MainAppView',
  layout: 'border',
  bodyBorder: false,
  defaults: {
    collapsible: true,
    split: true,
    bodyPadding: 15
  },
  initComponent: function() {
    this.items = [
        {
          region:'north',
          bodyPadding: 0,
          split: false,
          collapsible: false,
          height: '20px',
          margins: '5 5 0 5',
          items : [
            {
              xtype: 'MenuBarPanel'
            }
          ]
        },
        {
          title: 'Navigation',
          id: 'nav-accordian',
          region:'west',
          floatable: false,
          //margins: '5 0 5 5',
          width: '20%',
          minWidth: 100,
          maxWidth: 250,
          layout: {
            type: 'accordion',
            multi: true,
          },
          defaults: {
            collapsed: true,
            hideCollapseTool: true,
          },
          items: cc.util.TreeNavigation.getPanelTitles()
        },
        {
          title: 'Forms and Reporting',
          id: 'centerRegion',
          region:'center',
          collapseDirection: 'left',
          floatable: false,
          layout: 'fit',
          margins: '5 5 5 0',
          width: '40%',
        },
		/*
        {
          title: 'Map',
          region:'east',
          collapseDirection: 'left',
          flex: 1,
          floatable: false,
          margins: '5 0 5 0',
          layout: 'fit',
          width: '40%',
          items: [
            {
              xtype: 'MainMapPanel',

              // set default map center to Berkeley co-ordinates
              center: {
                lat: 40.714448123932996,
                lng: -74.010074230999976
              },
             
            }
          ]
        },
		*/
    ];
    this.callParent(arguments);
  },  
});