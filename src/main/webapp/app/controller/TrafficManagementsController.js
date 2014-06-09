Ext.define('cc.controller.TrafficManagementsController', {
    extend: 'Ext.app.Controller',
    models: [
      'TrafficManagement'
    ],
    stores:[
      'TrafficManagements'
    ],
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
      Ext.getCmp('scenarioElements').add(nav);
    }
})