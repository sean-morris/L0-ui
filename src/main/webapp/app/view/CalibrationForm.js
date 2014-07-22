Ext.define('cc.view.CalibrationForm', {
  extend: 'cc.view.PanelForm',
  alias: 'widget.CalibrationForm',
  model: 'cc.model.Calibration',
  id: 'calibration-form',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  closable: true,
  title: "New Calibration Form",
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
		anchor: '100%',
      },
      {
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name: 'description',
		anchor: '100%',
      },
      {
        xtype: 'filefield',
        fieldLabel: 'Path',
        name: 'path',
		anchor: '100%',
      },
      {
        xtype: 'button',
        text: 'Save Calibration',
        action: 'save',
		anchor: '100%',
      }
    ]
    this.callParent();
  },
});