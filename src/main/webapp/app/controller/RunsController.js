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
          url: 'run',
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
    }
})