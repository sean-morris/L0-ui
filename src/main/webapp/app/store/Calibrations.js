Ext.define('cc.store.Calibrations', {
    extend: 'Ext.data.Store',
    requires: ['cc.model.Calibration'],
    model: 'cc.model.Calibration',
    storeId: 'calibrations',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    loadStore: function(){
      this.loadData(cc.Globals.PROJECT.project.scenarioElements.calibrations)
    }
});
