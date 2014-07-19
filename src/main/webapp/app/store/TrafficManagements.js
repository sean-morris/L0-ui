Ext.define('cc.store.TrafficManagements', {
    extend: 'Ext.data.Store',
    model: 'cc.model.TrafficManagement',
    storeId: 'trafficManagements',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(cc.data.project.trafficManagements)
    }
});
