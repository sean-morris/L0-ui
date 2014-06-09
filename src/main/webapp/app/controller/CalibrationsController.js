Ext.define('cc.controller.CalibrationsController', {
    extend: 'Ext.app.Controller',
    models: [
      'Calibration'
    ],
    stores:[
      'Calibrations'
    ],
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
    }, 
    load: function() {
      this.getCalibrationsStore().load();
    }
})