/**
 *
 */
 Ext.define('cc.util.TreeNavigation', {
  alias: 'widget.TreeNavigation',
  singleton: true,
  beginText: '<span class="nav-begin-text">To populate Navigation:</br>File \
                > Open Project</span>',
  writeNav: function(params){
    return {
      xtype: 'treepanel',
      id: params.name.toLowerCase() + '-tree',
      showSeparator: false,
      floating: false,
      hideHeader: true,
      collapsed: false,
      rootVisible: false,
      border: 0,
      useArrows: true,
      store: cc.util.TreeNavigation.getStore(params.store, params.name)
    };
  },
  getStore: function(store, nodeName){
      return Ext.create('Ext.data.TreeStore', {
        model: 'Scenario',
        root: {
            expanded: true,
            children: [
               {
                  text:nodeName, 
                  children: cc.util.TreeNavigation.getChildren(store)    
               }
            ]
        }
    });
  },
  getChildren: function(store){
    var chi = [];
    store.getRange().forEach(function(child){
      chi.push({text: child.data.name, leaf: true, model:child});
    });
    return chi;
  },
  getPanelTitles: function(){
   return [{
            title: 'Scenario Elements',
            id: 'scenarioElements',
            collapsed: false,
            html: this.beginText,
          }, {
            title: 'Scenarios',
            id: 'scenarios',
            collapsed: true,
            tools: 
              [{
                  type: 'save',
                  id: 'new-scenario',
                  tooltip: 'New Scenario',
                }
              ]
          }, {
            title: 'Runs',
            id: 'runs',
            collapsed: true,
          },
          {
            title: 'Reports',
            id: 'reports',
            collapsed: true,
          }
    ]
  }
});