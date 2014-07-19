Ext.define('cc.model.Scenario', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'id',
    type: 'int'
  },{
    name: 'name',
    type: 'string'
  },{
    name: 'description',
    type: 'string'
  },{
    name: 'calibrationId',
    type: 'int',
    defaultValue: null
  },{
    name: 'planId',
    type: 'int',
    defaultValue: null
  }],
});