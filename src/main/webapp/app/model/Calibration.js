Ext.define('CC.model.Calibration', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'id',
    type: 'int'
  },{
    name: 'name',
    type: 'string'
  },{
    name: 'path',
    type: 'string'
  }]
});