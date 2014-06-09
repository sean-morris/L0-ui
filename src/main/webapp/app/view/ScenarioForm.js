Ext.define('cc.view.ScenarioForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.ScenarioForm',
  model: 'cc.model.Scenario',

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
        text: 'Submit',
        handler: this.commit,
        scope: this
      }
    ];
    this.callParent();
  },
});