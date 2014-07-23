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
    type: 'int',
	defaultValue: 0
  },{
    name: 'endTime',
    type: 'int',
	defaultValue: 86400
  },{
    name: 'dt',
    type: 'int',
	defaultValue: 5
  },{
    name: 'ensembleSize',
    type: 'int',
	defaultValue: 1
  },{
    name: 'scenarioId',
    type: 'int'
  },{
    name: 'alreadyRun',
    type: 'boolean',
	defaultValue: false
  }]
});