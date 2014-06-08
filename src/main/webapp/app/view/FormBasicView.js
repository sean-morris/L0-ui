//this could be declared in the Globals file for re-use
var vTypes = Ext.create('Ext.data.Store', {
    fields: ['vid', 'vtype'],
    data : [
        {"vid":"truck", "vtype":"Truck"},
        {"vid":"car", "vtype":"Car"},
        {"vid":"semi", "vtype":"Semi"}
    ]
});

Ext.define('cc.view.FormBasicView', {
  extend: 'Ext.form.Panel',
  alias: 'widget.FormBasicView',
  xtype: 'FormBasicView',
  bodyPadding: 5,
  autoScroll: true,
  width: '100%',
  title: 'Basic Form',
  fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
  },
  items: [{
        xtype: 'container',
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name', 
            name: 'Name',
            cls: 'field-margin',
            flex: 1
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',  
            name: 'Description',
            cls: 'field-margin',
            flex: 1
        },
        {
            xtype: 'checkboxgroup',
            name: 'Checks',
            fieldLabel: 'Check Box Group',
            columns: 2,
            width: '60%',
            cls: 'field-margin',
            vertical: true,
            items: [{
                boxLabel: 'Type 1',
                name: 'type1',
                inputValue: '1'
              }, {
                boxLabel: 'Type 2',
                name: 'type2',
                inputValue: '2'
              }, {
                boxLabel: 'Type 3',
                name: 'type3',
                inputValue: '3'
              }, {
                boxLabel: 'Type 4',
                name: 'type4',
                inputValue: '4'
              }, {
                boxLabel: 'Type 5',
                name: 'type5',
                inputValue: '5'
              }, {
                boxLabel: 'Type 6',
                name: 'type6',
                inputValue: '6'
              }
            ]
          },
          {
            xtype: 'datefield',
            fieldLabel: 'Simulation',
            name: 'simDate',
            allowBlank: false,
            maxValue: new Date()
          },
          {
            xtype: 'combobox',
            fieldLabel: 'Vehicle Types',
            name: 'vtypes',
            store: vTypes,
            valueField: 'vid',
            displayField: 'vtype',
            typeAhead: true,
            queryMode: 'local',
            emptyText: 'Select a vehicle type...'
          },
        ]
    }]
});