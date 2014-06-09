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
    'cc.util.GenerateNavigation'    
  ],
  models : [
    'UserModel',
    'NetworkModel',
    'Calibration',
  ],
  views: [
    'FileUploadForm',
    'FormBasicView',
    'LoginBarPanel',
    'LoginView',
    'MainAppView',
    'MainMapPanel',
    'MapOverLayView',
    'MapTileControlPanel',
    'MapTileControlMenu',
    'NetworkSelectionWindow',
    'MenuBarPanel',
    'MenuCheckItem',
    'MenuItem',
    'TreeView',
  ],
  controllers: [
    'FileUpload',
    'LoginController',
    'MainMapController',
    'NetworkController',
  ],
  stores: [
    'cc.store.Networks',
    'cc.store.Calibrations',
  ],
  // Application Launch Point, which renders Main Application view to body
  launch: function() {
    Ext.create('cc.view.MainAppView', {renderTo: Ext.getBody()});
  }

});