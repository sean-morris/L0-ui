Ext.define('cc.view.PanelForm', {
    extend: 'Ext.form.Panel',
    /**
     * Can be a reference to a model instance or a model class name.
     */
    model: null,
    /**
     * Set to the id of the model instance and the model will be loaded for you.
     * Only applicable if model provided is a model class name (string).
     */
    modelId: null,

    initComponent: function() {
        this.callParent();
        this.getForm().trackResetOnLoad = true; //Workaround

        if (Ext.isString(this.model)) {

            //Load a model to be updated
            if (this.modelId) {

                Ext.ClassManager.get(this.model).load(this.modelId, {
                    failure: this.onModelLoadFailure,
                    success: this.onModelLoadSuccess,
                    scope: this
                });

            //Load an empty record to be inserted
            } else {
                this.bindModel(Ext.create(this.model, {}));
            }

        } else {
            //Bind the provided model to be updated
            this.bindModel(this.model);
        }
        this.addEvents('loadsuccess', 'loadfailure', 'savesuccess', 'savefailure');
    },
    bindModel: function(model) {
        this.model = model;
        this.loadRecord(model);
    },
    commit: function(callback, scope) {
        if (this.form.isDirty()) {
            this.form.updateRecord(this.model);

            this.model.save({
                callback: function(records, operation) {
                    if (operation.wasSuccessful()) {
                        this.fireEvent('savesuccess', this, records, operation);
                    } else {
                        this.fireEvent('savefailure', this, records, operation);
                    }
                    if (callback) {
                        callback.call(scope || this, this, operation.wasSuccessful(), this.model);
                    }
                },
                scope: this
            });
        }
    },
    onModelLoadSuccess: function(record, operation) {
        this.bindModel(record);
        this.fireEvent('loadsuccess', this, record, operation);
    },
    onModelLoadFailure: function(record, operation) {
        this.fireEvent('loadfailure', this, record, operation);
    }
});