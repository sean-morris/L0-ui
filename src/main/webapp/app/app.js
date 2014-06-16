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

Ext.application({
  name: 'cc',

  requires: [
    'cc.util.EventManager',
    'cc.Globals',
    'cc.util.TreeNavigation',
  ],
  models : [
    'UserModel',
  ],
  views: [
    'MainAppView',
    'MapOverLayView',
    'MapTileControlPanel',
    'MapTileControlMenu',
    'NetworkSelectionWindow',
    'MenuBarPanel',
    'MenuCheckItem',
  ],
  controllers: [
    'CalibrationsController',
    'FileMenuController',
    'LoginController',
    'MainMapController',
    'NetworkController',
    'RunsController',
    'ScenariosController',
    'TrafficManagementsController',
  ],
  // Application Launch Point, which renders Main Application view to body
  launch: function() {
    Ext.widget('MainAppView', {renderTo: Ext.getBody()});
  }
});