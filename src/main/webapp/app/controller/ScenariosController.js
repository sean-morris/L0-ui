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
      {
        ref: 'centerRegion',
        selector : '#centerRegion'
      },
    ],
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
      this.control({
        '#scenario-form button[action=save]' : {
          click: this.onButtonClickSave
        },
        '#new-scenario' : {
          click: this.onAccordianClickNewScenario
        },
        '#scenarios-tree' : {
          itemclick: this.onTreeItemClick
        }
      });
    },
    onButtonClickSave: function(){
      var f = this.getScenarioForm();
      if (f.isDirty()) {
        f.updateRecord(f.model);
        this.getScenariosStore().add(f.model);
        this.renderTreeNav();
      }
      f.close();
    },
    onAccordianClickNewScenario: function(){
      var f = Ext.widget("ScenarioForm");
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
    onTreeItemClick: function(view, record) {
      var f = Ext.widget("ScenarioForm", {
        title: "Edit: " + record.data.text,
        model: record.raw.model
      });
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
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