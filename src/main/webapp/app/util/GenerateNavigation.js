/**
 *
 */
 Ext.define('CC.util.GenerateNavigation', {
  alias: 'widget.GenerateNavigation',
  singleton: true,
  beginText: '<span class="nav-begin-text">To populate Navigation:</br>File > Open Project</span>',
  writeNav: function(){
      var menus = [];
      var menuConfig = {
              xtype: 'TreeView',
              showSeparator: false,
              floating: false,
              hideHeader: false,
              collapsed: false,
              store:  CC.util.GenerateNavigation.getStore()
      };
      menus.push(menuConfig);
      Ext.getCmp('panelOne').update('');
      Ext.getCmp('panelOne').add(menus[0]);
      var keyArray = Ext.Object.getKeys(CC.Globals.PROJECT.project);

  },
  getStore: function(){
      var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true, 
            children: [
                { 
                  text:"Calibration", 
                  children: CC.util.GenerateNavigation.getChildren(CC.Globals.PROJECT.project["Scenario Elements"]["Calibrations"].names)    
                },
                { 
                  text:"Traffic Management", 
                  children: CC.util.GenerateNavigation.getChildren(CC.Globals.PROJECT.project["Scenario Elements"]["Traffic Management"].names)    
                }
            ]
        }
    });
    return store;
  },
  getChildren: function(children){
    var chi = [];
    children.forEach(function(child){
      chi.push({text: child, leaf: true});
    });
    return chi;
  },
  getPanelTitles: function(){
   return [ {
            title: 'Scenario Elements',
            id: 'panelOne',
            collapsed: false,
            html: this.beginText
          }, {
            title: 'Scenarios'
          }, {
            title: 'Runs'
          },
          {
            title: 'Reports'
          }
    ]
  }
});
