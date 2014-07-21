Ext.define('cc.controller.RunsController', {
    extend: 'Ext.app.Controller',
    views:[
      'RunForm',
    ],
    models: [
      'Run'
    ],
    stores:[
      'Runs', 'Scenarios'
    ],
    refs: [
      {
        ref: 'runForm',
        selector : '#run-form'
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
        '#run-form button[action=save]' : {
          click: this.onButtonClickSave
        },
        '#new-run' : {
          click: this.onAccordianClickNewRun
        },
        '#runs-nav' : {
          itemclick: this.onTreeItemClick
        },
        '#combo-scenario' : {
          render: this.renderEmptyCombo
        },
        '#execute-run' : {
          click: this.launchRun
        }
      });
    }, 
	
    load: function() {
      this.getRunsStore().load();
      this.renderTreeNav();
    },
	
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getRunsStore(),
          name: "Runs"
      });
      Ext.getCmp('runs').removeAll();
      Ext.getCmp('runs').add(nav);
    },
	
	// tree ......................
    onAccordianClickNewRun: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("RunForm", {
			scenariosStore: this.getScenariosStore(),
		});
        this.renderForm(f);
      }
    },
	
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("RunForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
		  scenariosStore: this.getScenariosStore(),
        });
        this.renderForm(f);
      }
    },
	
	// form ...................................
	
    renderEmptyCombo: function(box){
      var v = box.value;
      if (!v || v == 0 || box.getStore().getById(v) == null){
        box.setValue(box.emptyText);
        var f = this.getRunForm();
        this.setDirtyFalse(f); //emptyText still means it is not dirty
      }
    },
	
    onButtonClickSave: function(){
      var f = this.getRunForm();
      if (f.isDirty()) {
        f.updateRecord(f.model);
        this.setDirtyFalse(f);
        this.getRunsStore().add(f.model);
        this.renderTreeNav();
      }
    },
	
    renderForm : function(f){
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
	
	// auxiliary ...................................
    isSavedAndClose: function(){
      var f = this.getRunForm();
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
    },
	
	// launch beats .....................
    launchRun : function() {
      Ext.Ajax.request({
          scope: this,
          url: 'run',
          method: 'GET',
          // data to be passed to service here
          headers: {

          },
          success: function(responseObject, opts) {
            console.log("Run call made successfully");
          },
          failure: function(response, opts) {
            console.log("Run call blown");
          }
      });
    }
})