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
        xtype: 'combobox',
        fieldLabel: 'Calibration',
        displayField: 'name',
        emptyText: 'Select One...',
        store: this.calStore,
        valueField: 'id',
      },{
        xtype: 'combobox',
        fieldLabel: 'Traffic Management',
        displayField: 'name',
        emptyText: 'Select One...',
        store: this.tmStore,
        valueField: 'id',
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