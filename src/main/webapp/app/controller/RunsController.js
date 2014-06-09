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
    }
})