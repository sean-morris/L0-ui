/**
 * Global Event manager.  Should be declared as a global variable and then 
 * be used to register events and map them to appropriate components.
 *
 */
 Ext.define('CC.util.EventManager', {
  extend: 'Ext.util.Observable',
  alias: 'widget.EventManager',
  singleton: true, // ensure only one application event manager can exist

  /**
   * Add Event Listener to Manager.
   * Ensures when an ExtJs component which has an event listener attached is 
   * destroyed, the event listener is removed.
   */
  addListener: function(eventName,handler,scope,options) {
    if (scope) {
      scope.on({
        scope: this,
        beforedestroy: function() { 
          //create closure
          this.removeListener(eventName,handler,scope);       
        }
      });
    }
    // Call super class
    this.superclass.addListener.apply(this, arguments);
  }
});
