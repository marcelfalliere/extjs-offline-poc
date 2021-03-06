POC - a CR(U)D application built with EtxJs that works offline
==============================================================

About
-----

This application is a possible implementation of an application that is aimed to work offline. The 
applcation is about managing users. The server is powered by ruby on rails, allowing the developer to
quickly expose RESTful services on resources. The client is a full ExtJS4 one (not touch), with some 
vanilla javascript and with the use of persist.js.


Limitations and known errors
----------------------------

1. The rails server in development mode will make requests from iPad or any mobile device too slow, causing 
xhr to be badly handled by the server.

2. The use of `navigator.onLine`. Even if the server is reachable, deconnecting from your wifi/network will cause
it to return `false`.

3. ...

Installation
------------

1. Install rails (at least 3.x) if not already done. [Check the rails website](http://rubyonrails.org/download).

2. Clone the repository.

3. In the console, navigate to the root. Run `rake db:migrate` then `rails s`.

4. In a (modern) browser, navigate to localhost:3000 (`rails s -p xx` if you want a different port)

5. Connect/disconnect from your network. It works !