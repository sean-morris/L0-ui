/**
 * CC Login Controller
 */ 
Ext.define('CC.controller.LoginController', { 
  extend : 'Ext.app.Controller', 
  refs: [
    // Controller references, which query ExtJS for active component names
    // on selector.  Can then be accessed within controller by ref name.
    {
      // reference to LogInView
      ref: 'LoginView',
      selector: 'LoginView'
    }
  ],
  init: function() { 
    console.log("test");
    CC.util.EventManager.on('app:login', this.authenticateUser, this); 
  }, 
  authenticateUser : function() { 
    // get username, password and database from login view
    var username = this.getLoginView().down('#username').getValue()
    var password = this.getLoginView().down('#username').getValue()
    var database = this.getLoginView().down('#username').getValue()
    
    // Send Ajax Request to see if user is valid and authenticate 
    Ext.Ajax.request({
      scope: this,
      url: '/via-rest-api/login',
      method: 'GET',
      // pass username, password and database in request header
      headers: {
        'Authorization': window.btoa(username + ':' + password),
        'DB': database
      },
      success: function(responseObject) {
        var text = responseObject.responseText;

        // convert response text to JSON
        var response = Ext.JSON.decode(text);

        // if request was successful, remove model login window
        // and show logged in status
        if (response.success === true) {
          this.getLoginView().close();
          // TODO show login status
        } else {
          alert('Failed to load Network. ' + response.message);
        }
      }
    });
  }
});