/**
 * Network Controller.  Populates controller list by sending ajax request
 * to api to get list of networks.
 */
Ext.define('CC.controller.NetworkController', {
  extend: 'Ext.window.Window', 
  alias : 'widget.NetworkController',
  extend : 'Ext.app.Controller', 
  refs: [
    // Controller references, which query ExtJS for active component names
    // on selector.  Can then be accessed within controller by ref name.
    {
      // reference to LogInView
      ref: 'NetworkSelectionWindow',
      selector: 'NetworkSelectionWindow'
    }
  ],
  init: function() { 
    CC.util.EventManager.on('app:list-networks', this.listNetworks, this); 
  }, 
  listNetworks : function() { 
    Ext.Ajax.request({
        scope: this,
        url: CC.Globals.WEB_SERVICE_URL + 'project/1/scenario/1/network/',
        method: 'GET',
        headers: {
          'Authorization': CC.model.UserModel.authToken,
          'DB': CC.model.UserModel.database
        },
        success: function(responseObject){
          var text = responseObject.responseText;

          // convert response text to JSON
          var response = Ext.JSON.decode(text);

          // get network store reference and populate it
          var store = Ext.data.StoreManager.get('networks');
          store.add(response);
        },
        failure: function(response, opts) {
          // TODO add error message to login view
          alert('Failed to load Network. ' + response);
        }
      });
  }
});