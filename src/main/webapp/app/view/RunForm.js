Ext.define('cc.view.RunForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.RunForm',
  model: 'cc.model.Run',
  id: 'run-form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  closable: true,
  title: "New Run Form",
  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 150,
    msgTarget: 'side'
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name',
        anchor: '100%'
      },
      {
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name: 'description',
        anchor: '100%'
      },
      {
        xtype: 'timefield',
        fieldLabel: 'Start time',
        name: 'startTime',
        minValue: '00:00 AM',
        maxValue: '24:00 PM',
        increment: 30,
        anchor: '100%'
      },
      {
        xtype: 'timefield',
        fieldLabel: 'End time',
        name: 'endTime',
        minValue: '00:00 AM',
        maxValue: '24:00 PM',
        increment: 30,
        anchor: '100%'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Time step',
        name: 'dt',
        anchor: '100%'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Ensemble size',
        name: 'ensembleSize',
        anchor: '100%'
      },
	  {
        xtype: 'combobox',
        id: 'combo-scenario',
        fieldLabel: 'Scenario',
        displayField: 'name',
        emptyText: 'Select One...',
        store: this.scenariosStore,
        valueField: 'id',
        name: 'scenarioId',
		anchor: '100%',
      },
      {
        xtype: 'button',
        text: 'Save Run',
        action: 'save',
        anchor: '100%'
      }
    ]
    this.callParent();
  },
});