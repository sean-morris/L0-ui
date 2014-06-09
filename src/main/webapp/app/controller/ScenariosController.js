Ext.define('cc.controller.ScenariosController', {
    extend: 'Ext.app.Controller',
    views:[
      'ScenarioForm'
    ],
    models: [
      'Scenario'
    ],
    stores:[
      'Scenarios'
    ],
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
    }, 
    load: function() {
      this.getScenariosStore().load();
      this.renderTreeNav();
    },
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getScenariosStore(),
          name: "Scenarios"
      });
      Ext.getCmp('scenarios').update('');
      Ext.getCmp('scenarios').add(nav);
    }
})