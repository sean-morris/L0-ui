Ext.define('cc.store.Plans', {
    extend: 'Ext.data.Store',
    model: 'cc.model.Plan',
    storeId: 'plans',
    sorters:[{
      property:'name',
      direction:'ASC'
    }],
    load: function(){
      this.loadData(cc.data.project.plans)
    }
});
