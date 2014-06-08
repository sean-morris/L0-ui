/**
 * Connected Corridors Application Include File 
 * 
 * This defines all Connected Corridor Application ExtJS Modules
 * to be loaded.
 */
// @require @packageOverrides
Ext.Loader.setConfig({
  enabled: true,
  disableCaching: false
});

// Attach Main Application view
Ext.application({

  // Adds, global Components/Variables used throughout Application
  requires: [
    // utils
    'cc.util.EventManager',
    'cc.Globals',
    'cc.store.Networks'
  ],
  // View ExtJs files required by Application
  views: [
    'FileUploadForm',
    'LoginView',
    'MainAppView',
    'MainMapPanel',
    'MapOverLayView'
  ],
  // Controller ExtJs files required by Controller
  controllers: [
    'FileUpload',
    'MainMapController',
    'NetworkController',
    'LoginController',
  ],
  // CC for Connected Corridors
  name: 'cc',
  // Application Launch Point, which renders Main Application view to body
  launch: function() {
    Ext.create('cc.view.MainAppView', {renderTo: Ext.getBody()});
  }

});