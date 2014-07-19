Ext.define('cc.controller.PlansController', {
    extend: 'Ext.app.Controller',
    models: [
      'Plan'
    ],
    stores:[
      'Plans'
    ],
	
	// init / load / render .....................
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
    }, 
	
    load: function() {
      this.getPlansStore().load();
      this.renderTreeNav();
    },
	
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getPlansStore(),
          name: "Traffic Management"
      });
      Ext.getCmp('plans').removeAll();
      Ext.getCmp('plans').add(nav);
    }
})