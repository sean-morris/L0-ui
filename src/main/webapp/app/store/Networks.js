/**
 * ExtJs Data store to hold list of high level Network information.
 */
Ext.define('cc.store.Networks', {
  extend: 'Ext.data.Store',
  requires: ['cc.model.NetworkModel'],
  model: 'cc.model.NetworkModel',
  storeId: 'networks',
  sorters:[{
    property:'id',
    direction:'DESC'
  }]
});