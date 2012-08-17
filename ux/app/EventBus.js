/*
 * @private This pseudo-class is a dummy to load and hack Ext.app.EventBus.
 *
 * Copyright (c) 2011-2012 Alexander Tokarev.
 * Special thanks to IntelliSurvey Inc for sponsoring my work on this code.
 *  
 * This code is licensed under the terms of the Open Source LGPL 3.0 license.
 * Commercial use is permitted to the extent that the code/component(s) do NOT
 * become part of another Open Source or Commercially licensed development library
 * or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.define('Ext.ux.app.EventBus', {
    requires: [ 'Ext.app.EventBus' ]
},
function() {
    var Klass = Ext.app.EventBus;
    
    Ext.app.EventBus = new Klass();
});
