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
        click: this.exportProjectFile
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
      cc.data = Ext.JSON.decode(e.target.result);
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
  
  exportProjectFile: function() {
      var servletPath, xhReq;
      servletPath = "Download.do";
      xhReq = new XMLHttpRequest();
      xhReq.open("post", servletPath, false);
      xhReq.setRequestHeader('Content-Type', "text/json");
      xhReq.onreadystatechange = function() {
        if(xhReq.readyState == 4){
          var elemIF = Ext.DomQuery.selectNode("#download-iframe")
          if(elemIF != null)
            elemIF.remove();
          elemIF = document.createElement("iframe");
          elemIF.id = "download-iframe";
          elemIF.src = servletPath;
          elemIF.style.display = "none";
          Ext.getBody().appendChild(elemIF);
        }
      };
      return xhReq.send(Ext.JSON.encode(cc.data));
  },
  
  hideFakePath: function(field, value){
    var n = Ext.DomQuery.selectNode('input[id='+field.getInputId()+']');
    n.value = value.replace("C:\\fakepath\\","");
  }
})