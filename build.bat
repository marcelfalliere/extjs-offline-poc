CALL sencha create jsb  -a http://localhost:3000/index.html -p public/app.jsb3
CALL sencha build -p public/app.jsb3 -d .
CALL git add .
CALL git commit -a -m %1
CALL git push heroku master
