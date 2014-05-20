/**
 *
 */
 Ext.define('CC.util.GenerateNavigation', {
  alias: 'widget.GenerateNavigation',
  singleton: true, // ensure only one application event manager can exist
  
  writeNav: function(){
      var proj = CC.Globals.PROJECT;
      proj.project["Scenario Elements"]
      var menus = [];
      var menuConfig = {
              title: "Scenario Elements",
              xtype: 'TreeView',
              showSeparator: false,
              floating: false,
              hideHeader: false,
              collapsed: menu > 0,
              store: getStore()
      };
  },
  getStore: function(){
      var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true, 
            text:"Scenario Elements",
            children: [
                { text:"Calibration", leaf: true,
                    children: getChildren(CC.Globals.PROJECT.project["Scenario Elements"]["Calibrations"].names)[
                },
            ]
        }
    });
  },
  getChildren: function(children){
    var chi = [];
    children.forEach(function(child){
      chi.push({text: child, leaf: true});
    });
    return chi;
  }
});
