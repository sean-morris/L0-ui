/**
  *  This file handles all the events related to uploading a data file.
  *  The file menu item 'File > Open Project' instantiates the FileUploadForm
  *  which is handled by this controller.
**/
Ext.define('cc.controller.FileMenuController', {
  extend: 'Ext.app.Controller',
  views: [
    'FileUploadForm'
  ],
  refs : [
    {
      ref: 'dataFile',
      selector : '#form-file'
    },{
      ref: 'uploadFormWindow',
      selector: 'FileUploadForm'
    }
  ],
  init: function() {
    this.control({
      'FileUploadForm button[action=upload]':{
        click: this.uploadFile
      },
      '#form-file' : {
        change: function(field, value){
          Ext.getCmp('upload').enable();
          this.hideFakePath(field, value);
        }
      },
      '#menu-save' : {
        click: this.exportFile
      },
      '#menu-open' : {
        click: function() {
          Ext.widget('FileUploadForm');
        }
      }
    }); 
  }, 
  uploadFile: function() {
    var me = this;
    var f = this.getDataFile().fileInputEl.dom.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
      cc.data = JSON.parse(e.target.result);
      me.getUploadFormWindow().close();
      cc.util.EventManager.fireEvent('stores:load');
    };
    reader.onerror = function(event){
      Ext.MessageBox.show({
         title: 'File Load Error',
         msg: 'The file failed to load.',
         buttons: Ext.MessageBox.OK,
         animateTarget: 'mb9',
         icon:Ext.MessageBox.ERROR
     });
    };
    reader.readAsText(f);
  },
  exportFile: function() {
    Ext.Ajax.request({
      scope: this,
        url: cc.Globals.WEB_SERVICE_URL + 'download',
        method: 'GET',
        // data to be passed to service here
        headers: {

        },
        success: function(responseObject, opts) {
          console.log("Run call made successfully");
        },
        failure: function(response, opts) {
          console.log("Run call blown");
        }
    });
  },
  hideFakePath: function(field, value){
    var n = Ext.DomQuery.selectNode('input[id='+field.getInputId()+']');
    n.value = value.replace("C:\\fakepath\\","");
  }
})