Ext.define('cc.store.Calibrations', {
    extend: 'Ext.data.Store',
    model: 'cc.model.Calibration',
    storeId: 'calibrations',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(cc.data.project.scenarioElements.calibrations)
    }
});
