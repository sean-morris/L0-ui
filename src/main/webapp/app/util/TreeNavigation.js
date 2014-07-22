/**
 *
 */
 Ext.define('cc.util.TreeNavigation', {
  alias: 'widget.TreeNavigation',
  singleton: true,
  beginText: '<span class="nav-begin-text">To populate Navigation:</br>File \
                > Open Project</span>',
		
/*	
  writeNav: function(params){
    return {
      xtype: 'treepanel',
      id: params.name.toLowerCase() + '-nav',
      showSeparator: false,
      floating: false,
      hideHeader: true,
      rootVisible: false,
      border: 0,
      useArrows: true,
      store: cc.util.TreeNavigation.getStore(params.store, params.name)
    };
  },
  */
  		
  writeNav: function(params){
    return {
      xtype: 'gridpanel',
      id: params.name.toLowerCase() + '-nav',
	  stateful: true,
	  collapsible: false,
	  multiSelect: false,
	  border: false,
	  hideHeaders: true,
	  forceFit: true,
	  height: 350,
	  viewConfig: {
		stripeRows: true,
	  	enableTextSelection: false
	   },
	   columns: [{ text: '',  dataIndex: 'name' } ],
       store: params.store
    };
  },
  
  /*
  getStore: function(store, nodeName){
      return Ext.create('Ext.data.TreeStore', {
        root: {
          children: [
            {
              text:nodeName,
              //expanded: true,
              children: cc.util.TreeNavigation.getChildren(store)    
            }
          ]
        }
    });
  },
  */
  
  getChildren: function(store){
    var chi = [];
    store.getRange().forEach(function(child){
      chi.push({text: child.data.name, leaf: true, model:child});
    });
    return chi;
  },
  
  getPanelTitles: function(){
   return [{
            title: 'Calibrations',
            id: 'calibrations',
          }, {
            title: 'Plans',
            id: 'plans',
          }, {
            title: 'Scenarios',
            id: 'scenarios',
			/*
            tools: 
              [{
                type: 'save',
                id: 'new-scenario',
                tooltip: 'New Scenario',
              }]
			  */
          }, {
            title: 'Runs',
            id: 'runs',
			/*
            tools:  
              [{
                type: 'save',
                id: 'new-run',
                tooltip: 'New Run',
              },{
                type: 'gear',
                id: 'execute-run',
                tooltip: 'Execute Run',
              },]
			  */
          },
          {
            title: 'Reports',
            id: 'reports',
          }
    ]
  }
});