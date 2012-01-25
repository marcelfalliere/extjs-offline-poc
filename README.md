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

1. The deployment process of sencha, that makes `all-classes.js` and `app-all.js`, seems to cause a problem on
webkit based browsers. The xhr /users.json is canceled (check console when running index.html), even if there's 
a goood content_type, `/application/json` and the requests itself works with `index-debug.html` and in a new tab
of the navigator.

Installation
------------

1. Install rails (at least 3.x) if not already done. [Check the rails website](http://rubyonrails.org/download).

2. Clone the repository.

3. In the console, navigate to the root. Run `rake db:migrate` then `rails s`.

4. In a (modern) browser, navigate to localhost:3000 (`rails s -p xx` if you want a different port)

5. Connect/disconnect from your network. It works !