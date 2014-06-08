/**
 *
 */
 Ext.define('cc.util.GenerateNavigation', {
  alias: 'widget.GenerateNavigation',
  singleton: true,
  beginText: '<span class="nav-begin-text">To populate Navigation:</br>File > Open Project</span>',
  writeNav: function(){
      var stores = ["Calibrations"];
      var menus = [];
      stores.forEach(function(store){
          var s = Ext.data.StoreManager.get(store.toLowerCase());
          s.loadStore();
          var menuConfig = {
              xtype: 'treepanel',
              showSeparator: false,
              floating: false,
              hideHeader: true,
              collapsed: false,
              rootVisible: false,
              border: 0,
              useArrows: true,
              store:  cc.util.GenerateNavigation.getStore(s, store)
          };
          menus.push(menuConfig);      
      });
      Ext.getCmp('panelOne').update('');
      Ext.getCmp('panelOne').add(menus[0]);
  },
  getStore: function(store, nodeName){
      var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
               {
                  text:nodeName, 
                  children: cc.util.GenerateNavigation.getChildren(store)    
               }
            ]
        }
    });
    return store;
  },
  getChildren: function(store){
    var chi = [];
    store.getRange().forEach(function(child){
      chi.push({text: child.data.name, leaf: true});
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
                  type:'save',
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