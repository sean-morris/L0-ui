Ext.define('cc.model.Plan', {
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
    name: 'path',
    type: 'string'
  }]
});