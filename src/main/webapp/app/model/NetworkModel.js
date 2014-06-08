/**
 * Model to represent high level network information.
 */
Ext.define('cc.model.NetworkModel', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'description',
    type: 'string'
  },{
    name: 'id',
    type: 'int'
  },{
    name: 'isEmpty',
    type: 'boolean'
  },{
    name: 'lockedForEdit',
    type: 'boolean'
  },{
    name: 'lockedForHistory',
    type: 'boolean'
  },{
    name: 'modStamp',
    type: 'date'
  },{
    name: 'name',
    type: 'string'
  }]
});