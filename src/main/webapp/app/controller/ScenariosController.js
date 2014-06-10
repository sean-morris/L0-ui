Ext.define('cc.controller.ScenariosController', {
    extend: 'Ext.app.Controller',
    views:[
      'ScenarioForm',
    ],
    models: [
      'Scenario'
    ],
    stores:[
      'Scenarios'
    ],
    refs: [
      {
        ref: 'scenarioForm',
        selector : '#scenario-form'
      },
    ],
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
      this.control({
        '#scenario-form button[action=save]' : {
          click: function(e){
            if (this.getScenarioForm().isDirty()) {
              this.getScenarioForm().updateRecord(this.getScenarioForm().model);
              this.getScenariosStore().add(this.getScenarioForm().model);
              this.renderTreeNav();
            }
          }
        }
      });
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
      Ext.getCmp('scenarios').removeAll();
      Ext.getCmp('scenarios').add(nav);
    }
})