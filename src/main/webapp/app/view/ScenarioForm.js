Ext.define('cc.view.ScenarioForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.ScenarioForm',
  model: 'cc.model.Scenario',
  id: 'scenario-form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  closable: true,
  title: "New Scenario Form",
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
        xtype: 'combobox',
        id: 'combo-calib',
        fieldLabel: 'Calibration',
        displayField: 'name',
        emptyText: 'Select One...',
        store: this.calStore,
        valueField: 'id',
        name: 'calibrationId',
      },{
        xtype: 'combobox',
        id: 'combo-plan',
        fieldLabel: 'Plan',
        displayField: 'name',
        emptyText: 'Select One...',
        store: this.planStore,
        valueField: 'id',
        name: 'planId',
      },
      {
        xtype: 'button',
        text: 'Save Scenario',
        action: 'save'
      }
    ]
    this.callParent();
  },
});