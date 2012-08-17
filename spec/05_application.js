/*
 * Ext.ux.app.Application test suite
 *
 * @title Ext.ux.app.Application
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
    'Ext.ux.app.Controller',
    'Ext.app.Application',
    'Ext.ux.app.Application'
]);

Ext.define('Test.model.Foo', {
    extend: 'Ext.data.Model',
    
    fields: ['foo']
},
function() {
    Ext.define('Test.store.Foo', {
        extend: 'Ext.data.Store',
        
        model: 'Test.model.Foo',
        prop:  'foo'
    },
    function() {
        Ext.define('Test.view.Foo', {
            extend: 'Ext.panel.Panel',
            alias:  'widget.fooPanel',
            
            id:     'fooPanel',
            prop:   'foo',
            width:  100,
            height: 100,
            
            renderTo: Ext.getBody()
        });
    });
});

Ext.define('Test.model.Bar', {
    extend: 'Ext.data.Model',
    
    fields: ['bar']
},
function() {
    Ext.define('Test.store.Bar', {
        extend: 'Ext.data.Store',
        
        model: 'Test.model.Bar',
        prop:  'bar'
    },
    function() {
        Ext.define('Test.view.Bar', {
            extend: 'Ext.panel.Panel',
            alias:  'widget.barPanel',
            
            id:     'barPanel',
            prop:   'bar',
            width:  100,
            height: 100,
            
            renderTo: Ext.getBody()
        });
    });
});

Ext.define('Test.model.App', {
    extend: 'Ext.data.Model',
    
    fields: [ 'app' ]
},
function() {
    Ext.define('Test.store.App', {
        extend: 'Ext.data.Store',
        
        model: 'Test.model.App',
        prop:  'app'
    },
    function() {
        Ext.define('Test.view.App', {
            extend: 'Ext.panel.Panel',
            alias:  'widget.appPanel',
            
            id:     'appPanel',
            prop:   'app',
            width:  100,
            height: 100,
            
            renderTo: Ext.getBody()
        });
    });
});

describe("Ext.ux.app.Application", function() {
    it("is an override not a class", function() {
        var Klass;
        
        try {
            Klass = Ext.ux.app.Application;
        } catch(e) {};
        
        expect(Klass).toBeUndefined();
    });
    
    it("overrides Ext.app.Application", function() {
        expect(Ext.app.Application.prototype.initControllers).toBeFunction()
    });
});

describe("Ext.ux.app.Controller", function() {
    it("should define controller Foo", function() {
        Ext.define('Test.controller.Foo', {
            extend: 'Ext.app.Controller',
            
            id: 'foo',
            
            models: [ 'Foo' ],
            stores: [ 'Foo' ],
            views:  [ 'Foo' ],
            
            refs: [
                { ref: 'panelFooByXtype', selector: 'fooPanel'     },
                { ref: 'panelFooById',    selector: '#fooPanel'    },
                { ref: 'panelFooByProp',  selector: '[prop="foo"]' }
            ],
            
            init: function() {
                this.control({
                    'fooPanel': {
                        titlechange: this.onPanelFooTitle
                    },
                    
                    '#fooPanel': {
                        disable: this.onPanelFooDisable
                    },
                    
                    '[prop="foo"]': {
                        close: this.onPanelFooClose
                    },
                    
                    'controller#Bar': {
                        barEvent: this.onCtrlBarEvent
                    }
                });
            },
            
            onPanelFooTitle:   jasmine.createSpy(),
            onPanelFooDisable: jasmine.createSpy(),
            onPanelFooClose:   jasmine.createSpy(),
            onCtrlBarEvent:    jasmine.createSpy()
        });
        
        expect(Test.controller.Foo).toBeFunction();
    });
    
    it("should define controller Bar", function() {
        Ext.define('Test.controller.Bar', {
            extend: 'Ext.app.Controller',
            
            id: 'bar',
            
            models: [ 'Bar' ],
            stores: [ 'Bar' ],
            views:  [ 'Bar' ],
            
            refs: [
                { ref: 'panelBarByXtype', selector: 'barPanel'     },
                { ref: 'panelBarById',    selector: '#barPanel'    },
                { ref: 'panelBarByProp',  selector: '[prop="bar"]' }
            ],
            
            init: function() {
                this.control({
                    'barPanel': {
                        titlechange: this.onPanelBarTitle
                    },
                    
                    '#barPanel': {
                        disable: this.onPanelBarDisable
                    },
                    
                    '[prop="bar"]': {
                        close: this.onPanelBarClose
                    },
                    
                    'controller#Foo': {
                        fooEvent: this.onCtrlFooEvent
                    }
                });
            },
            
            onPanelBarTitle:   jasmine.createSpy(),
            onPanelBarDisable: jasmine.createSpy(),
            onPanelBarClose:   jasmine.createSpy(),
            onCtrlFooEvent:    jasmine.createSpy()
        });
        
        expect(Test.controller.Bar).toBeFunction();
    });
});

describe("Augmented Ext.app.Application class", function() {
    it("should be extendable", function() {
        Ext.define('Test.App', {
            extend: 'Ext.app.Application',
            
            name: 'Test',
            
            autoCreateViewport: false,
            
            controllers: [ 'Foo', 'Bar' ],
            
            models: [ 'App' ],
            stores: [ 'App' ],
            views:  [ 'App' ],
            
            refs: [
                { ref: 'panelAppByXtype', selector: 'appPanel'     },
                { ref: 'panelAppById',    selector: '#appPanel'    },
                { ref: 'panelAppByProp',  selector: '[prop="app"]' }
            ],
            
            init: function() {
                this.control({
                    'appPanel': {
                        titlechange: this.onPanelAppTitle
                    },
                    
                    '#appPanel': {
                        disable: this.onPanelAppDisable
                    },
                    
                    '[prop="app"]': {
                        close: this.onPanelAppClose
                    },
                    
                    'controller': {
                        fooEvent: this.onControllerEvent,
                        barEvent: this.onControllerEvent
                    }
                });
            },
            
            onPanelAppTitle:   jasmine.createSpy(),
            onPanelAppDisable: jasmine.createSpy(),
            onPanelAppClose:   jasmine.createSpy(),
            onControllerEvent: jasmine.createSpy()
        });
        
        expect(Test.App).toBeFunction();
    });
});

// This is so that application never goes out of scope
var app, appPanel;

describe("Augmented Ext.app.Application instance", function() {
    it("is able to instantiate", function() {
        app = new Test.App();
        
        expect(app).toBeDefined();
    });
    
    it("catches a ride on EventBus", function() {
        expect(app.eventbus).toBeDefined();
    });
    
    it("creates controller Foo", function() {
        var ctrlFoo = app.controllers.getAt(0);
        
        expect(ctrlFoo.id).toBe('Foo');
    });
    
    it("creates controller Bar", function() {
        var ctrlBar = app.controllers.getAt(1);
        
        expect(ctrlBar.id).toBe('Bar');
    });
    
    it("creates Model accessors", function() {
        expect(app.getAppModel).toBeFunction();
    });
    
    it("returns Model by accessor", function() {
        var m = app.getAppModel();
        
        expect(m.modelName).toBe('Test.model.App');
    });
    
    it("returns Model by getModel", function() {
        var m = app.getModel('App');
        
        expect(m.modelName).toBe('Test.model.App');
    });
    
    it("creates Store accessors", function() {
        expect(app.getAppStore).toBeFunction();
    });
    
    it("returns Store by accessor", function() {
        var s = app.getAppStore();
        
        expect(s.prop).toBe('app');
    });
    
    it("returns Store by getStore()", function() {
        var s = app.getStore('App');
        
        expect(s.prop).toBe('app');
    });
    
    it("creates View accessors", function() {
        expect(app.getAppView).toBeFunction();
    });
    
    it("returns component by accessor", function() {
        var v = app.getAppView();
        
        expect(v.xtype).toBe('appPanel');
    });
    
    it("returns component by getView()", function() {
        var v = app.getView('App');
        
        expect(v.xtype).toBe('appPanel');
    });
    
    it("instantiates view", function() {
        var Panel = app.getAppView();
        
        appPanel = new Panel();
        
        expect(appPanel.xtype).toBe('appPanel');
    });
    
    it("creates ref getters 1", function() {
        expect(app.getPanelAppByXtype).toBeFunction();
    });
    
    it("creates ref getters 2", function() {
        expect(app.getPanelAppById).toBeFunction();
    });
    
    it("creates ref getters 3", function() {
        expect(app.getPanelAppByProp).toBeFunction();
    });
    
    it("returns component by ref 1", function() {
        var p = app.getPanelAppByXtype();
        
        expect(p.xtype).toBe('appPanel');
    });
    
    it("returns component by ref 2", function() {
        var p = app.getPanelAppById();
        
        expect(p.xtype).toBe('appPanel');
    });
    
    it("returns component by ref 3", function() {
        var p = app.getPanelAppByProp();
        
        expect(p.xtype).toBe('appPanel');
    });
    
    it("controls events by ref 1", function() {
        var panel = Ext.getCmp('appPanel');
        
        panel.setTitle('foo');
        
        expect(app.onPanelAppTitle).toHaveBeenCalled();
    });
    
    it("controls events by ref 2", function() {
        var panel = Ext.getCmp('appPanel');
        
        panel.disable();
        
        expect(app.onPanelAppDisable).toHaveBeenCalled();
    });
    
    it("controls events by ref 3", function() {
        var panel = Ext.getCmp('appPanel');
        
        panel.close();
        
        expect(app.onPanelAppClose).toHaveBeenCalled();
    });
    
    it("returns controller Foo by id", function() {
        var ctrlFoo = app.getController('Foo');
        
        expect(ctrlFoo).toBeDefined();
    });
    
    it("returns controller Bar by id", function() {
        var ctrlBar = app.getController('Bar');
        
        expect(ctrlBar).toBeDefined();
    });
});

describe("Augmented Ext.app.Controller with Application", function() {
    var panelFoo = new Test.view.Foo(),
        panelBar = new Test.view.Bar(),
        ctrlFoo, ctrlBar;
    
    it("should be already instantiated by Application", function() {
        ctrlFoo = app.getController('Foo');
        ctrlBar = app.getController('Bar');
        
        expect(ctrlFoo.init).toBeFunction();
        expect(ctrlBar.init).toBeFunction();
    });
    
    it("is linked to Application", function() {
        expect(ctrlFoo.application).toEqual(app);
    });
    
    it("returns other controllers", function() {
        var ctrl = ctrlFoo.getController('Bar');
        
        expect(ctrl).toEqual(ctrlBar);
    });
    
    it("returns own Models", function() {
        var m = ctrlFoo.getModel('Foo');
        
        expect(m.modelName).toBe('Test.model.Foo');
    });
    
    it("returns foreign Models", function() {
        var m = ctrlFoo.getModel('Bar');
        
        expect(m.modelName).toBe('Test.model.Bar');
    });
    
    it("returns own Stores", function() {
        var s = ctrlFoo.getStore('Foo');
        
        expect(s.prop).toBe('foo');
    });
    
    it("returns foreign Stores", function() {
        var s = ctrlFoo.getStore('Bar');
        
        expect(s.prop).toBe('bar');
    });
    
    it("returns own Views", function() {
        var v = ctrlFoo.getView('Foo');
        
        expect(v.xtype).toBe('fooPanel');
    });
    
    it("returns foreign Views", function() {
        var v = ctrlFoo.getView('Bar');
        
        expect(v.xtype).toBe('barPanel');
    });
    
    it("creates getters for its own views 1", function() {
        expect(ctrlFoo.getPanelFooByXtype).toBeFunction();
    });
    
    it("creates getters for its own views 2", function() {
        expect(ctrlFoo.getPanelFooById).toBeFunction();
    });
    
    it("creates getters for its own views 3", function() {
        expect(ctrlFoo.getPanelFooByProp).toBeFunction();
    });
    
    it("doesn't create getters for foreign views 1", function() {
        expect(ctrlFoo.getPanelBarByXtype).toBeUndefined();
    });

    it("doesn't create getters for foreign views 2", function() {
        expect(ctrlFoo.getPanelBarById).toBeUndefined();
    });

    it("doesn't create getters for foreign views 3", function() {
        expect(ctrlFoo.getPanelBarByProp).toBeUndefined();
    });
    
    it("returns view by ref 1", function() {
        var v = ctrlFoo.getPanelFooByXtype();
        
        expect(v).toBe(panelFoo);
    });
    
    it("returns view by ref 2", function() {
        var v = ctrlFoo.getPanelFooById();
        
        expect(v).toBe(panelFoo);
    });
    
    it("returns view by ref 3", function() {
        var v = ctrlFoo.getPanelFooByProp();
        
        expect(v).toBe(panelFoo);
    });
    
    it("controls its views' events by xtype", function() {
        panelFoo.setTitle('foo');
        
        expect(ctrlFoo.onPanelFooTitle).toHaveBeenCalled();
    });
    
    it("controls its views' events by id", function() {
        panelFoo.disable();
        
        expect(ctrlFoo.onPanelFooDisable).toHaveBeenCalled();
    });
    
    it("controls its views' events by prop", function() {
        panelFoo.close();
        
        expect(ctrlFoo.onPanelFooClose).toHaveBeenCalled();
    });
    
    it("doesn't react to foreign views' events 1", function() {
        expect(ctrlBar.onPanelBarTitle).not.toHaveBeenCalled();
    });

    it("doesn't react to foreign views' events 2", function() {
        expect(ctrlBar.onPanelBarDisable).not.toHaveBeenCalled();
    });

    it("doesn't react to foreign views' events 3", function() {
        expect(ctrlBar.onPanelBarClose).not.toHaveBeenCalled();
    });
    
    it("controls other Controllers' events 1", function() {
        ctrlFoo.fireEvent('fooEvent');
        
        expect(ctrlBar.onCtrlFooEvent).toHaveBeenCalled();
    });
    
    it("controls other Controllers' events 2", function() {
        ctrlBar.fireEvent('barEvent');
        
        expect(ctrlFoo.onCtrlBarEvent).toHaveBeenCalled();
    });
});

describe("Augmented Ext.app.Application again", function() {
    it("catches Controllers' events", function() {
        expect(app.onControllerEvent.callCount).toBe(2);
    });
});