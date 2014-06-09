Ext.define('cc.view.ScenarioForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.ScenarioForm',
  model: 'cc.model.Scenario',
  title: 'Scenario Form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 150,
        msgTarget: 'side'
  },
  items:[
      {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Description',
        name: 'desc'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Calibration',
        name: 'calibrationId'
      },{
        xtype: 'textfield',
        fieldLabel: 'Traffic Management',
        name: 'trafficManagementId'
      },
      {
        xtype: 'button',
        text: 'Save Scenario',
        handler: this.commit,
        scope: this
      }
    ]
});