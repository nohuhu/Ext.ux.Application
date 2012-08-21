/*
 * This is an override to Ext.app.Controller, providing some internal refactoring
 * to loosen the coupling between Ext.app.Controller and Ext.app.Application classes.
 *
 * Changes:
 * - Ext.app.EventBus is no longer instantiated by Ext.app.Application, it was
 *   converted to a singleton
 * - Ext.app.Controller is not dependent on Ext.app.Application to control() things
 *   anymore
 * - It is now possible to control() not only Views, but other Controllers as well.
 *
 * Usage:
 *
 *    Ext.define('My.Controller', {
 *        extend: 'Ext.app.Controller',
 *        
 *        require: [ 'Ext.ux.app.Controller' ],
 *        
 *        init: function() {
 *            var me = this;
 *        
 *            me.control({
 *                'someview childofsomeview': {
 *                    click: me.onSomeViewChildClick
 *                },
 *            
 *                'controller': {     // Sees specified events from *all* Controllers
 *                    controllerFooEvent:    me.onControllerFooEvent,
 *                    controllerBarEvent:    me.onControllerBarEvent,
 *                    commonControllerEvent: me.onCommonControllerEvent
 *                },
 *
 *                'controller#foo': { // Sees events only from Controller with id 'foo'
 *                    someEvent: me.onControllerFooSpecificEvent
 *                }
 *            });
 *        }
 *    });
 *
 * Version 0.02
 *
 * Copyright (c) 2012 Alexander Tokarev.
 * Special thanks to IntelliSurvey Inc for sponsoring my work on this code.
 *  
 * This code is licensed under the terms of the Open Source LGPL 3.0 license.
 * Commercial use is permitted to the extent that the code/component(s) do NOT
 * become part of another Open Source or Commercially licensed development library
 * or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.define('Ext.ux.app.Controller', {
    override: 'Ext.app.Controller',
    
    requires: [
        'Ext.ux.app.EventBus'
    ],
    
    isController: true,
    
    constructor: function(config) {
        var me = this;
        
        me.callParent(arguments);
        
        me.initEventBus();
    },
    
    initEventBus: function() {
        var me = this;
        
        me.eventbus = Ext.app.EventBus;
    },

    control: function(selectors, listeners) {
        this.eventbus.control(selectors, listeners, this);
    },
    
    /*
     * @private
     */
    is: function(selector) {
        return selector === '{isController}' ||
               selector === 'controller'     ||
               new RegExp('controller#' + this.id).test(selector);
    },

    fireEvent: function(eventName) {
        var me = this;
        
        if ( me.callParent(arguments) !== false ) {
        
            // EventBus.dispatch() will slice arguments itself
            me.eventbus.dispatch(eventName, me, arguments);
        }
    },

    getController: function(name) {
        var me = this;
        
        return name === me.id   ? me
             : me.application   ? me.application.getController(name)
             : undefined
             ;
    },

    getStore: function(name) {
        var me = this;
        
        return me.application ? me.application.getStore(name) : undefined;
    },

    getModel: function(model) {
        var me = this;
        
        return me.application ? me.application.getModel(model) : undefined;
    },

    getView: function(view) {
        var me = this;
        
        return me.application ? me.application.getView(view) : undefined;
    }
});
