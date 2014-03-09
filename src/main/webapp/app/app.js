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
    'CC.util.EventManager',
  ],
  // View ExtJs files required by Application
  views: [
    'LoginView',
    'MainAppView',
    'MainMapPanel',
    'MapOverLayView'
  ],
  // Controller ExtJs files required by Controller
  controllers: [
    'MainMapController',
    'NetworkController',
    'LoginController'
  ],
  // CC for Connected Corridors
  name: 'CC',
  // Application Launch Point, which renders Main Application view to body
  launch: function() {
    Ext.create('CC.view.MainAppView', {renderTo: Ext.getBody()});
  }

});

// Define Globals here under the CC.Globals namespace
Ext.ns('CC.Globals');

CC.Globals.WEB_SERVICE_URL = '/via-rest-api-new-ui/';
