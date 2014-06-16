Ext.define('cc.controller.RunsController', {
    extend: 'Ext.app.Controller',
    models: [
      'Run'
    ],
    stores:[
      'Runs'
    ],
    init: function() {
      cc.util.EventManager.on('stores:load', this.load, this);
      this.control({
        '#execute-run' : {
          click: this.launchRun
        }
      }); 
    }, 
    load: function() {
      this.getRunsStore().load();
      this.renderTreeNav();
    },
    renderTreeNav: function(){
      var nav = cc.util.TreeNavigation.writeNav({
          store: this.getRunsStore(),
          name: "Runs"
      });
      Ext.getCmp('runs').update('');
      Ext.getCmp('runs').add(nav);
    },
    launchRun : function() {
      Ext.Ajax.request({
        scope: this,
          url: cc.Globals.WEB_SERVICE_URL + 'run',
          method: 'GET',
          // pass username, password and database in request header
          headers: {
            'Authorization': cc.model.UserModel.authToken,
            'DB': cc.model.UserModel.database
          },
          success: function(responseObject, opts) {
            console.log("ssss");
          },
          failure: function(response, opts) {
            // TODO add error message to login view
            alert('Failed to login. ' + response.statusText);
          }
      });
    }
})