/*
 * Ext.ux.app.Controller test suite
 *
 * @title Ext.ux.app.Controller
 *
 * These scripts should go first
 * @script /v=7.0/jslib/extjs4/ext-dev.js
 * @script /v=7.0/javascript/test/ext-common.js
 * 
 */

Ext.syncRequire([
    'Ext.data.Model',
    'Ext.data.Store',
    'Ext.panel.Panel',
    'Ext.app.Controller',
    'Ext.ux.app.Controller'
]);

describe("Ext.ux.app.Controller", function() {
    it("is an override not a class", function() {
        var Klass;
        
        try {
            Klass = Ext.ux.app.Controller;
        } catch (e) {};
        
        expect(Klass).toBeUndefined();
    });
    
    it("overrides Ext.app.Controller", function() {
        expect(Ext.app.Controller.prototype.initEventBus).toBeDefined();
    });
});

describe("Augmented Ext.app.Controller w/o Application", function() {
    var panelEventFired = false,
        ctrlEventFired  = false,
        panel, Klass, ctrl;
    
    it("should create testing panel (not a test)", function() {
        panel = new Ext.panel.Panel({
            id:     'fooPanel',
            prop:   'foo',
            width:  100,
            height: 100,
            
            renderTo: Ext.getBody()
        });
        
        expect(panel).toBeDefined();
        
        callback = jasmine.createSpy();
    });
    
    it("should be extendable", function() {
        Klass = Ext.define('Test.Controller', {
            extend: 'Ext.app.Controller',
            
            id: 'klass',
            
            refs: [
                { ref: 'panelByXtype', selector: 'panel'        },
                { ref: 'panelById',    selector: '#fooPanel'    },
                { ref: 'panelByProp',  selector: '[prop="foo"]' }
            ],
            
            init: function() {
                this.control({
                    'panel#fooPanel': {
                        resize: function() { panelEventFired = true; }
                    },
                    
                    'controller': {
                        foo: function() { ctrlEventFired = true; }
                    }
                });
            }
        });
        
        expect(Klass).toBeDefined();
    });
    
    it("should be able to instantiate", function() {
        ctrl = new Klass({
            id: 'foo'
        });
        
        expect(ctrl.id).toBe('foo');
    });
    
    it("should be init()-able", function() {
        expect(function() { ctrl.init() }).not.toThrow();
    });
    
    it("should create ref getters 1", function() {
        expect(ctrl.getPanelByXtype).toBeFunction();
    });
    
    it("should create ref getters 2", function() {
        expect(ctrl.getPanelById).toBeFunction();
    });
    
    it("should create ref getters 3", function() {
        expect(ctrl.getPanelByProp).toBeFunction();
    });
    
    it("should return component by ref 1", function() {
        var p = ctrl.getPanelByXtype();
        
        expect(p).toEqual(panel);
    });
    
    it("should return component by ref 2", function() {
        var p = ctrl.getPanelById();
        
        expect(p).toEqual(panel);
    });
    
    it("should return component by ref 3", function() {
        var p = ctrl.getPanelByProp();
        
        expect(p).toEqual(panel);
    });
    
    it("should control View events", function() {
        panel.setSize(50, 50);
        
        expect(panelEventFired).toBeTruthy();
    });
    
    it("should control Controller events", function() {
        ctrl.fireEvent('foo');
        
        expect(ctrlEventFired).toBeTruthy();
    });
    
    it("should return self on getController(self-id)", function() {
        var c = ctrl.getController('foo');
        
        expect(c).toEqual(ctrl);
    });
    
    it("should return undefined on getController(foreign-id)", function() {
        var c = ctrl.getController('bar');
        
        expect(c).toBeUndefined();
    });
    
    it("should return undefined on getStore(foo)", function() {
        var s = ctrl.getStore('foo');
        
        expect(s).toBeUndefined();
    });
    
    it("should return undefined on getModel(foo)", function() {
        var m = ctrl.getModel('foo');
        
        expect(m).toBeUndefined();
    });
    
    it("should return undefined on getView(foo)", function() {
        var v = ctrl.getView('foo');
        
        expect(v).toBeUndefined();
    });
});
