Ext.ux.Application
==================

UPDATE: An extended solution is now available as part of Ext JS 4.2;
the code is still relevant for Ext JS 4.1 applications.

This set of pseudo-classes (overrides) is aimed at solving two major
problems with current Ext JS MVC implementation: tight coupling of
Application and Controller classes, and absence of default coupling
mechanism for Controllers.

First problem stems from Ext.app.Controller class being dependent on
Ext.app.Application to perform some very important tasks it should do,
and generally failing with errors unless Ext.app.Application is
instantiated too. Application, in turn, tried to load all Controllers,
Models, Stores and Views it is configured with, making it downright
impossible to unit-test Controller code.

Second problem is very actual for larger applications: now that you
have several Controllers managing their Views, how do you interoperate
between Controllers? Ext.ux.app.Controller adds event handling to
Controller classes, making it possible to use control() method to
listen on other Controllers' events, thus enabling loose coupling
without much effort and overhead.

Tested with:
- MSIE 6+
- Chrome 6+
- Firefox 3.6+
- Opera 11
- Safari 4+

This extension is released under GPL 3.0 license.

Commercial use is permitted to the extent that the code/component(s) do NOT
become part of another Open Source or Commercially licensed development 
library or toolkit without explicit permission.

Copyright (c) 2011-2012 by Alexander Tokarev, <nohuhu@nohuhu.org>.
Special thanks to IntelliSurvey Inc for sponsoring my work on this code.
