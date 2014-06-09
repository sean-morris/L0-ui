Ext.define('cc.view.NetworkSelectionWindow', {
  extend: 'Ext.window.Window', 
  alias : 'widget.NetworkSelectionWindow',
  // attach to data store
  requires : [
    'Ext.grid.Panel',
    'Ext.data.StoreManager',
    'cc.store.Networks'
  ],
  // Newtork window properties
  id: 'network-selection-window',
  title: 'Network Selection', 
  model: true,
  constrain: true,
  autoShow: true,             
  height: 400,                 
  width: 350,
  layout: {
      type: 'fit'              
  },
  iconCls: 'key',                           
  closeAction: 'destroy',         
  closable: true,
  frame : true,
  // add grid panel to list networks 
  items: [{ 
    xtype: 'grid',
    itemId: 'networkGrid',
    //store: Ext.create('cc.store.Networks'),
    loadMask: true,
    width: 300,
    columns: [{
      header: 'ID',
      dataIndex: 'id',
      width: 50,
      flex: 1
    },{
      header: 'Name',
      dataIndex: 'name',
      width: 250,
      flex: 1
    /*},{
      header: 'Modified Date',
      dataIndex: 'modifiedDate',
      width: 100,
      flex: 1
    },{
      header: 'Modified By',
      dataIndex: 'modifiedBy',
      width: 100,
      flex: 1*/
    }],
    // add grid panel click event listener
    listeners: {
      itemclick: function(dv, record, item, index, e) {
        // fire event to load clicked on network
        cc.util.EventManager.fireEvent('app:load-network', record.get('id'));
        // close grid
        Ext.getCmp('network-selection-window').close();   
      }                                    
    }
  }],
  // constructor function
  constructor: function () {
    this.callParent(arguments);
    // fire event to load network list
    cc.util.EventManager.fireEvent('app:list-networks', this);
  }
});