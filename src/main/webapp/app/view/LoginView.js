/**
 * CC Login Window
 */ 
Ext.define('CC.view.LoginView', { 
  extend: 'Ext.window.Window', 
  alias : 'widget.LoginView',

  // Login window properties
  id: 'login-window',
  title: 'Login', 
  model: true,
  constrain: true,
  autoShow: true,             
  height: 200,                 
  width: 350,
  layout: {
      type: 'fit'              
  },
  iconCls: 'key',                           
  closeAction: 'hide',         
  closable: true,
  title : 'CC Login', 
  frame : true, 
  items: [{ 
    // Add login form
    xtype: 'form', 
    frame: false,        
    bodyPadding: 15,      
    defaults: {             
      xtype: 'textfield', 
      anchor: '100%',     
      labelWidth: 60     
    },
    // Add fields to form
    items: [{
      // Username Field
      xtype: 'textfield', 
      fieldLabel: 'user', 
      name: 'username', 
      itemId: 'username', 
      allowblank: false, 
    },{ 
      // Password Field
      xtype: 'textfield',
      inputType: 'password',  
      fieldLabel: 'password', 
      name: 'password', 
      itemId: 'password', 
      allowblank: false, 
    },{
      // Database selection combo box
      xtype: 'combo',
      fieldLabel: 'database',
      name: 'database',
      value: 'ccoradb',
      valueField: 'v',
      displayField: 'database',
      mode: 'local',
      typeAhead: false,
      store: new Ext.data.SimpleStore({
        fields:['database','v'],
        data: [['ccoradb','ccoradb.path.berkeley.edu'],['cctest','cctest.path.berkeley.edu']]
      }),
    }],
  }], 
  // Log in button, on click fires sigin attempt through global event manager
  buttons:[{ 
    text: 'Login', 
    listeners :{ 
      click: function() { 
        // fire login event which login controller will handle by attempting to log in
        CC.util.EventManager.fireEvent('app:login');        
      }
    } 
  }] 
});