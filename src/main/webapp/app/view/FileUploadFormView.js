var myForm = {
      xtype: 'filefield',
      id: 'form-file',
      emptyText: 'Select a project file',
      fieldLabel: 'Project File',
      name: 'file-project',
      buttonText: '...',
      listeners : {
        change: function(field){
          var file = field.fileInputEl.dom.files[0];
          var reader = new FileReader();
          reader.onload = function(e){
            var JsonObj = JSON.parse(e.target.result);
            CC.Globals.PROJECT = JsonObj;
          };
          reader.onerror = function(event){
            console.log("Error");
          };
          reader.readAsText(file);
        }
      }
} 

Ext.define('CC.view.FileUploadFormView', {
  extend: 'Ext.window.Window',
  alias: 'widget.FileUploadFormView',
  xtype: 'FileUploadFormView',
    // Login window properties
  id: 'upload-window',
  title: 'CC Upload', 
  model: true,
  constrain: true,
  autoShow: true,             
  height: 130,                 
  width: 350,
  layout: {
      type: 'fit'              
  },
  iconCls: 'key',                           
  closeAction: 'destroy',         
  closable: true,
  items:[
  { 
    // Add upload form
    xtype: 'form', 
    frame: false,        
    bodyPadding: 15,      
    defaults: {             
      xtype: 'textfield', 
      anchor: '100%',     
      labelWidth: 80     
    },
    // Add fields to form
    items: [
      myForm,
    ]
  }],
  buttons: [{
        text: 'Upload',
        handler: function(){
          var menus = CC.util.GenerateNavigation.writeNav();
          this.up('window').close();          
        }
  }],
});