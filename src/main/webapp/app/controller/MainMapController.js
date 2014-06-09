/**
 * Controller to manage loading and rendering of map links and nodes.
 */
Ext.define('cc.controller.MainMapController', {
    extend: 'Ext.app.Controller',
    alias: 'widget.MainMapController',
    views: [
      'MainMapPanel'
    ],
    refs: [
      // Controller references, which query ExtJS for active component names
      // on selector.  Can then be accessed within controller by ref name.
      {
        // reference to MainMapPanel View
        ref: 'MainMapPanelView',
        selector: 'MainMapPanel'
      }
    ],

    init: function() {
      // Add event listeners here
      cc.util.EventManager.on('app:load-network', this.loadNetwork, this);
    },

    loadNetwork: function(networkId) {

      Ext.Ajax.request({
        scope: this,
        url: cc.Globals.WEB_SERVICE_URL + 'project/1/scenario/1/network/'+networkId+'/detail/5',
        method: 'GET',
        headers: {
          'Authorization': cc.model.UserModel.authToken,
          'DB': cc.model.UserModel.database
        },
        success: function(responseObject){
          var text = responseObject.responseText;

          // convert response text to JSON
          var response = Ext.JSON.decode(text);

          // if request was successful, draw network
          if (response.success === true) {
            var network = response.resource;
            // Get map panel view, to draw network
            this.getMainMapPanelView().loadNetwork(network);
          } else {
            alert('Failed to load Network. ' + response.message);

          }
        },
        failure: function(response, opts) {
          // TODO add error message to login view
          alert('Failed to load Network. ' + response.statusText);
        }
      });
    }

});
