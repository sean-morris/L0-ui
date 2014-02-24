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
  views: [
    'MainAppView',
    'MainMapPanel',
  ],
  // CC for Connected Corridors
  name: 'CC',
  // Application Launch Point
  launch: function() {
    Ext.create('CC.view.MainAppView', {renderTo: Ext.getBody()});
  }

});
