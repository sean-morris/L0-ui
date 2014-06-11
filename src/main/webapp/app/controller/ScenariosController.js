Ext.define('cc.controller.ScenariosController', {
    extend: 'Ext.app.Controller',
    views:[
      'ScenarioForm',
    ],
    models: [
      'Scenario'
    ],
    stores:[
      'Scenarios', 'Calibrations', 'TrafficManagements'
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
        this.setDirtyFalse(f);
        this.getScenariosStore().add(f.model);
        this.renderTreeNav();
      }
    },
    onAccordianClickNewScenario: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("ScenarioForm", {
                  calStore: this.getCalibrationsStore(),
                  tmStore: this.getTrafficManagementsStore(),
                });
        this.renderForm(f);
      }
    },
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("ScenarioForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
          calStore: this.getCalibrationsStore(),
          tmStore: this.getTrafficManagementsStore(),
        });
        this.renderForm(f);
      }
    },
    renderForm : function(f){
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
    isSavedAndClose: function(){
      var f = this.getScenarioForm();
      if(f != null && f.isDirty())
        return false;
      
      if(f != null && !f.isDirty())
        f.close();
      
      return true;
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
    },
    setDirtyFalse: function(f){
      //a bit of a hack to force saved fields to be clean(not dirty)
      f.items.each(function(f){
        if(f.isDirty){
          f.originalValue = f.getValue();
        }
      });   
    }
})