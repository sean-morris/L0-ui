/**
 * ExtJs Data store to hold list of high level Network information.
 */
Ext.define('CC.store.Networks', {
  extend: 'Ext.data.Store',
  requires: ['CC.model.NetworkModel'],
  model: 'CC.model.NetworkModel',
  storeId: 'networks',
  sorters:[{
    property:'id',
    direction:'DESC'
  }]
});