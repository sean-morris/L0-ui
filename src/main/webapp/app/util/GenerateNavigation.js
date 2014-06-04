/**
 *
 */
 Ext.define('CC.util.GenerateNavigation', {
  alias: 'widget.GenerateNavigation',
  singleton: true,
  beginText: '<span class="nav-begin-text">To populate Navigation:</br>File > Open Project</span>',
  writeNav: function(){
      Ext.create('CC.store.Calibrations');
      var cStore = Ext.data.StoreManager.get('calibrations');
      cStore.loadData(CC.Globals.PROJECT.project["Scenario Elements"]["Calibrations"]);
      var menus = [];
      var menuConfig = {
              xtype: 'treepanel',
              showSeparator: false,
              floating: false,
              hideHeader: false,
              collapsed: false,
              store:  CC.util.GenerateNavigation.getStore(cStore)
          
      };
      menus.push(menuConfig);
      Ext.getCmp('panelOne').update('');
      Ext.getCmp('panelOne').add(menus[0]);
      var keyArray = Ext.Object.getKeys(CC.Globals.PROJECT.project);

  },
  getStore: function(cStore){
      var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            data: cStore
            // children: [
            //     { 
            //       text:"Calibration", 
            //       children: CC.util.GenerateNavigation.getChildren(CC.Globals.PROJECT.project["Scenario Elements"]["Calibrations"])    
            //     },
            //     { 
            //       text:"Traffic Management", 
            //       children: CC.util.GenerateNavigation.getChildren(CC.Globals.PROJECT.project["Scenario Elements"]["Traffic Management"])    
            //     }
            // ]
        }
    });
    store.load(cStore);
    return store;
  },
  getChildren: function(children){
    var chi = [];
    children.forEach(function(child){
      chi.push({text: child.name, leaf: true});
    });
    return chi;
  },
  getPanelTitles: function(){
   return [{
            title: 'Scenario Elements',
            id: 'panelOne',
            collapsed: false,
            html: this.beginText,
          }, {
            title: 'Scenarios',
            collapsed: true,
            tools: 
              [{
                  id:'save',
                  tooltip: 'New Scenario',
                  handler: function(){ alert("open form"); }
                }
              ]
          }, {
            title: 'Runs',
            collapsed: true,
          },
          {
            title: 'Reports',
            collapsed: true,
          }
    ]
  }
});