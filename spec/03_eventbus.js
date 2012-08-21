/*
 * @title Ext.ux.app.EventBus
 *
 * @script jslib/extjs4/ext-dev.js
 * @script test/ext-common.js
 * 
 */

Ext.syncRequire([
    'Ext.ux.app.EventBus'
]);

describe("Ext.ux.app.EventBus override", function() {
    it("creates global Ext.app.EventBus instance", function() {
        expect(Ext.app.EventBus.isInstance).toBeTruthy();
    });
});
