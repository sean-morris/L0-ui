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
    'FormBasicView',
    'MainAppView',
    'MapOverLayView',
    'MapTileControlPanel',
    'MapTileControlMenu',
    'NetworkSelectionWindow',
    'MenuBarPanel',
    'MenuCheckItem',
    'MenuItem',
  ],
  controllers: [
    'CalibrationsController',
    'FileUpload',
    'LoginController',
    'MainMapController',
    'NetworkController',
  ],
  // Application Launch Point, which renders Main Application view to body
  launch: function() {
    Ext.create('cc.view.MainAppView', {renderTo: Ext.getBody()});
  }

});