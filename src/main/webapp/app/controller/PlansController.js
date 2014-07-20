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
        '#new-plan' : {
          click: this.onAccordianClickNewPlan
        },
        '#plans-tree' : {
          itemclick: this.onTreeItemClick
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
          name: "Traffic Management"
      });
      Ext.getCmp('plans').removeAll();
      Ext.getCmp('plans').add(nav);
    },
	
	// tree ......................
    onAccordianClickNewPlan: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("PlanForm");
        this.renderForm(f);
      }
    },
	
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("PlanForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
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