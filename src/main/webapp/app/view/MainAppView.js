/**
 * Connected Corridors Main Application View Container
 *
 */
Ext.define('CC.view.MainAppView', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.panel.Panel',
        'CC.view.MainMapPanel'
    ],
    layout: 'fit',
    border: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'MainMapPanel',
                    center: {
                        lat: 42.339641,
                        lng: -71.094224
                    },
                    markers: [{
                        lat: 42.339641,
                        lng: -71.094224,
                        title: 'Boston Museum of Fine Arts',
                        listeners: {
                            click: function(e){
                                Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                            }
                        }
                    },{
                        lat: 42.339419,
                        lng: -71.09077,
                        title: 'Northeastern University'
                    }]
                }
            ]
        });
        me.callParent(arguments);
    }
});