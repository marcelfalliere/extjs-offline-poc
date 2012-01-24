CALL sencha create jsb  -a http://localhost:3000/index.html -p public/app.jsb3
CALL sencha build -p public/app.jsb3 -d .
MOVE all-classes.js "D:\EasyPHP5.2.10\www\extjs-offline-poc\public"
MOVE app-all.js "D:\EasyPHP5.2.10\www\extjs-offline-poc\public"
CALL git add .
CALL git commit -a -m %1
