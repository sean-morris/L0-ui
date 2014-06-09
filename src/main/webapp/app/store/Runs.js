Ext.define('cc.store.Runs', {
    extend: 'Ext.data.Store',
    model: 'cc.model.Run',
    storeId: 'runs',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(cc.data.project.runs)
    }
});
