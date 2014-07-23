Ext.define('cc.controller.ScenariosController', {
    extend: 'Ext.app.Controller',
    views:[
      'ScenarioForm',
    ],
    models: [
      'Scenario'
    ],
    stores:[
      'Scenarios', 'Calibrations', 'Plans'
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
	
	// init / load / render .....................
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
      this.control({
        '#scenario-form button[action=save]' : {
          click: this.onButtonClickSave
        },
        '#menu-new-scenario' : {
          click: this.onNewScenario
        },
        '#scenarios-nav' : {
          itemclick: this.onGridItemClick
        },
        '#combo-calib, #combo-plans' : {
          render: this.renderEmptyCombo
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
    },
	
	// tree ......................
    onNewScenario: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("ScenarioForm", {
				  title: "New Scenario",
                  calStore: this.getCalibrationsStore(),
                  planStore: this.getPlansStore(),
                });
        this.renderForm(f);
      }
    },
	
	/*
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("ScenarioForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
          calStore: this.getCalibrationsStore(),
          planStore: this.getPlansStore(),
        });
        this.renderForm(f);
      }
    },
	*/
	
    onGridItemClick: function(view, record) {
      if(this.isSavedAndClose()){
        var f = Ext.widget("ScenarioForm", {
          title: "Edit: " + record.data.name,
          model: record,
          calStore: this.getCalibrationsStore(),
          planStore: this.getPlansStore(),
        });
        this.renderForm(f);
      }
    },
	
	// form ...................................
    renderEmptyCombo: function(box){
      var v = box.value;
      if (!v || v == 0 || box.getStore().getById(v) == null){
        box.setValue(box.emptyText);
        var f = this.getScenarioForm();
        this.setDirtyFalse(f); //emptyText still means it is not dirty
      }
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
	
    renderForm : function(f){
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
	
	// auxiliary ...................................
    isSavedAndClose: function(){
      var f = this.getScenarioForm();
      if(f != null && f.isDirty())
        return false;
      if(f != null && !f.isDirty())
        f.close();
      return true;
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