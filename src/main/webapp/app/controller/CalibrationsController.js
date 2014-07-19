Ext.define('cc.controller.CalibrationsController', {
    extend: 'Ext.app.Controller',
    views:[
      'CalibrationForm',
    ],
    models: [
      'Calibration'
    ],
    stores:[
      'Calibrations'
    ],
    refs: [
      {
        ref: 'calibrationForm',
        selector : '#calibration-form'
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
        '#calibration-form button[action=save]' : {
          click: this.onButtonClickSave
        },
        '#new-calibration' : {
          click: this.onAccordianClickNewCalibration
        },
        '#calibrations-tree' : {
          itemclick: this.onTreeItemClick
        }
      });
    }, 
	
    load: function() {
      this.getCalibrationsStore().load();
      this.renderTreeNav();
    },
	
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getCalibrationsStore(),
          name: "Calibrations"
      });
      Ext.getCmp('calibrations').removeAll();
      Ext.getCmp('calibrations').add(nav);
    },
	
	// tree ......................
    onAccordianClickNewCalibration: function(){
      if(this.isSavedAndClose()){
        var f = Ext.widget("CalibrationForm");
        this.renderForm(f);
      }
    },
	
    onTreeItemClick: function(view, record) {
      if(record.data.parentId != "root" && (this.isSavedAndClose())){
        var f = Ext.widget("CalibrationForm", {
          title: "Edit: " + record.data.text,
          model: record.raw.model,
          //calStore: this.getCalibrationsStore(),
          //tmStore: this.getTrafficManagementsStore(),
        });
        this.renderForm(f);
      }
    },
	
	// form ...................................
	
    onButtonClickSave: function(){
      var f = this.getCalibrationForm();
      if (f.isDirty()) {
        f.updateRecord(f.model);
        this.setDirtyFalse(f);
        this.getCalibrationsStore().add(f.model);
        this.renderTreeNav();
      }
    },
	
    renderForm : function(f){
      this.getCenterRegion().removeAll(true);
      this.getCenterRegion().add(f);
    },
	
	// auxiliary ...................................
    isSavedAndClose: function(){
      var f = this.getCalibrationForm();
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