Ext.define('CC.store.Calibrations', {
    extend: 'Ext.data.Store',
    requires: ['CC.model.Calibration'],
    model: 'CC.model.Calibration',
    storeId: 'calibrations',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(CC.Globals.PROJECT.project["Scenario Elements"]["Calibrations"])
    }
});
