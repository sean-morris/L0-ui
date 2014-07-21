Ext.define('cc.view.PlanForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.PlanForm',
  model: 'cc.model.Plan',
  id: 'plan-form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  closable: true,
  title: "New Plan Form",
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
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name: 'description'
      },
      {
        xtype: 'filefield',
        fieldLabel: 'Path',
        name: 'path'
      },
      {
        xtype: 'button',
        text: 'Save Plan',
        action: 'save'
      }
    ]
    this.callParent();
  },
});