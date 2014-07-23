Ext.define('cc.controller.PlansController', {
    extend: 'Ext.app.Controller',
    views:[
      'PlanForm',
    ],
    models: [
      'Plan'
    ],
    stores:[
      'Plans'
    ],
    refs: [
      {
        ref: 'planForm',
        selector : '#plan-form'
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
        '#plan-form button[action=save]' : {
          click: this.onButtonClickSave
        },
        '#menu-new-plan' : {
          click: this.onNewPlan
        },
        '#plans-nav' : {
          itemclick: this.onGridItemClick
        }
      });
    }, 
	
    load: function() {
      this.getPlansStore().load();
      this.renderTreeNav();
    },
	
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getPlansStore(),
          name: "Plans"
      });
      Ext.getCmp('plans').removeAll();
      Ext.getCmp('plans').add(nav);
    },
	
	// tree ......................
    onNewPlan: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("PlanForm",{
			title: "New Plan",
		});
        this.renderForm(f);
      }
    },
	
	/*
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("PlanForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
        });
        this.renderForm(f);
      }
    },
	*/
	
    onGridItemClick: function(view, record) {
      if(this.isSavedAndClose()){
        var f = Ext.widget("PlanForm", {
          title: "Edit: " + record.data.name,
          model: record,
        });
        this.renderForm(f);
      }
    },
	
	// form ...................................
	
    onButtonClickSave: function(){
      var f = this.getPlanForm();
      if (f.isDirty()) {
        f.updateRecord(f.model);
        this.setDirtyFalse(f);
        this.getPlansStore().add(f.model);
        this.renderTreeNav();
      }
    },
	
    renderForm : function(f){
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
	
	// auxiliary ...................................
    isSavedAndClose: function(){
      var f = this.getPlanForm();
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