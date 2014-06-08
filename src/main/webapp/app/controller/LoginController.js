/**
 * CC Login Controller.  Sends Ajax request to log into database and
 * authorize user credentials.
 */ 
Ext.define('cc.controller.LoginController', { 
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
    cc.util.EventManager.on('app:login', this.authenticateUser, this); 
  }, 
  authenticateUser : function() { 
    // get username, password and database from login view
    var username = this.getLoginView().down('#username').getValue();
    var password = this.getLoginView().down('#password').getValue();
    
    // get database value from combobox datastore
    var dbComboBox = this.getLoginView().down('#database');
    var store = dbComboBox.getStore();
    var index = store.find('v', dbComboBox.getValue());
    // If the record has been found
    if(index != -1) { 
      var database = store.getAt(index).raw[1];  
    }
    // Add authentication and databse to global user model
    cc.model.UserModel.authToken = window.btoa(username + ':' + password);
    cc.model.UserModel.database = database;
    // Send Ajax Request to see if user is valid and authenticate 
    Ext.Ajax.request({
      scope: this,
      url: cc.Globals.WEB_SERVICE_URL + 'login',
      method: 'GET',
      // pass username, password and database in request header
      headers: {
        'Authorization': cc.model.UserModel.authToken,
        'DB': cc.model.UserModel.database
      },
      success: function(responseObject, opts) {
        var text = responseObject.responseText;
        // convert response text to JSON
        var response = Ext.JSON.decode(text);
        // if request was successful, remove model login window
        // and show logged in status
        if (response.authenticated === true) {
          this.getLoginView().close();
          var networkWindow = new cc.view.NetworkSelectionWindow();
          // TODO show login status
        } else {
          // TODO add error message to login view
          alert('Failed to login. ' + response.message);
        }
      },
      failure: function(response, opts) {
        // TODO add error message to login view
        alert('Failed to login. ' + response.statusText);
      }
    });
  }
});