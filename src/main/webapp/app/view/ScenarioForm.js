Ext.define('cc.view.ScenarioForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.ScenarioForm',
  model: 'cc.model.Scenario',
  id: 'scenario-form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  closable: true,
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
        name: 'name'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Description',
        name: 'description'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Calibration',
        name: 'calibrationId'
      },{
        xtype: 'textfield',
        fieldLabel: 'Traffic Management',
        name: 'trafficMPId'
      },
      {
        xtype: 'button',
        text: 'Save Scenario',
        action: 'save'
      }
    ]
    this.callParent();
  }
});