Ext.define('cc.view.FileUploadForm', {
  extend: 'Ext.window.Window',
  alias: 'widget.FileUploadForm',
  title: 'Data Upload', 
  constrain: true,
  autoShow: true,
  height: 130,
  width: 350,
  layout: {
    type: 'fit'
  },
  closeAction: 'destroy',
  closable: true,
  items:[
  { 
    xtype: 'form',
    frame: false,
    bodyPadding: 15,
    defaults: {
      xtype: 'textfield', 
      anchor: '100%',
      labelWidth: 80
    },
    items: [
      {
        xtype: 'filefield',
        id: 'form-file',
        emptyText: 'Select a project file',
        fieldLabel: 'Project File',
        name: 'file-project',
        buttonText: '...',
      }
    ]
  }],
  buttons: [{
    text: 'Upload',
    action: 'upload'
  }],
});