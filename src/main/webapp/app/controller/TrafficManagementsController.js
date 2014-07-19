Ext.define('cc.controller.TrafficManagementsController', {
    extend: 'Ext.app.Controller',
    models: [
      'TrafficManagement'
    ],
    stores:[
      'TrafficManagements'
    ],
	
	// init / load / render .....................
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
    }, 
	
    load: function() {
      this.getTrafficManagementsStore().load();
      this.renderTreeNav();
    },
	
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getTrafficManagementsStore(),
          name: "Traffic Management"
      });
      Ext.getCmp('traffic-managements').removeAll();
      Ext.getCmp('traffic-managements').add(nav);
    }
})