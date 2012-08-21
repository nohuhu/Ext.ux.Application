/*
 * This is an override to Ext.app.Application, providing some internal refactoring
 * to loosen the coupling between Ext.app.Controller and Ext.app.Application classes.
 *
 * Changes:
 * - Ext.app.EventBus is no longer instantiated by Ext.app.Application, it was
 *   converted to a singleton
 * - Ext.app.Controller is not dependent on Ext.app.Application to control() things
 *   anymore
 * - Ext.app.Application is now more Controller-like, it can do the same things,
 *   i.e. listen to events, etc. Could be useful to provide top-level binding
 *   for application parts.
 * - It is now possible to control() not only Views, but other Controllers.
 *
 * Usage: require Ext.ux.app.Application in your main Application class.
 * No other configuration is necessary.
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
 
Ext.define('Ext.ux.app.Application', {
    override: 'Ext.app.Application',
    
    requires: [
        'Ext.ux.app.Controller'
    ],
    
    /**
     * Creates new Application.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);

        var me = this,
            requires = config.requires || [],
            controllers, ln, i, controller,
            paths, path, ns;

        Ext.Loader.setPath(me.name, me.appFolder);

        if (me.paths) {
            paths = me.paths;

            for (ns in paths) {
                if (paths.hasOwnProperty(ns)) {
                    path = paths[ns];

                    Ext.Loader.setPath(ns, path);
                }
            }
        }

        Ext.app.Controller.prototype.constructor.apply(me, arguments);

        controllers = Ext.Array.from(me.controllers);
        ln = controllers && controllers.length;

        if (me.autoCreateViewport) {
            requires.push(me.getModuleClassName('Viewport', 'view'));
        }

        for (i = 0; i < ln; i++) {
            requires.push(me.getModuleClassName(controllers[i], 'controller'));
        }

        Ext.require(requires);

        Ext.onReady(me.initControllers, me);
    },

    initControllers: function() {
        var me = this,
            controllers, controller;

        controllers    = me.controllers;
        me.controllers = new Ext.util.MixedCollection();

        me.init(me);
        
        for (var i = 0, ln = controllers.length; i < ln; i++) {
            controller = me.getController(controllers[i]);
            controller.init(me);
        }

        me.onBeforeLaunch.call(me);
    },

    control: function(selectors, listeners) {
        this.eventbus.control(selectors, listeners, this);
    }
});
