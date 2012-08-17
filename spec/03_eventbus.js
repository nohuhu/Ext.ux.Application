/*
 * Ext.ux.app.EventBus test suite
 *
 * @title Ext.ux.app.EventBus
 *
 * These scripts should go first
 * @script /v=7.0/jslib/extjs4/ext-dev.js
 * @script /v=7.0/javascript/test/ext-common.js
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
