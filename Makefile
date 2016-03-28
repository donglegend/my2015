server:
	node app.js

s:
	make server

run:
	gulp -p 4001

b:
	gulp browserify
	gulp styles

d:
	gulp build