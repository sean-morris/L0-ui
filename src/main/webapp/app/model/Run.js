Ext.define('cc.model.Run', {
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
    name: 'startTime',
    type: 'string'
  },{
    name: 'endTime',
    type: 'string'
  },{
    name: 'dt',
    type: 'int'
  },{
    name: 'ensembleSize',
    type: 'int'
  },{
    name: 'scenarioId',
    type: 'int'
  },{
    name: 'alreadyRun',
    type: 'boolean'
  }]
});