Ext.define('cc.store.Scenarios', {
    extend: 'Ext.data.Store',
    model: 'cc.model.Scenario',
    storeId: 'scenarios',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(cc.data.project.scenarios)
    }
});
