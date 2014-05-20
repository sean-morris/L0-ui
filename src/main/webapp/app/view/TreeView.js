var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true, 
        text:"Scenario",
        children: [
            { text:"detention", leaf: true },
            { text:"homework", expanded: true, 
                children: [
                    { text:"book report", leaf: true },
                    { text:"alegrbra", leaf: true}
                ]
            },
            { text: "buy lottery tickets", leaf:true }
        ]
    }
});     
Ext.define('CC.view.TreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.TreeView',
    xtype: 'TreeView',
    bodyPadding: 5,
    width: 200,
    height: '100%',
    store: store,
    rootVisible: true,
    useArrows: true,
    border: false
});