SERVER APPLICATION
Nodejs is required with espress, multer, body parser and mongodb.
(npm install express, nmp install multer, npm install body-parser, npm install mongodb)

It's possible to run the server application just entering in src_server and running node index.js

!!!NOTE: THE CONNECTION TO MONGOLAB DOESN'T WORK IN THE UNIVERSITY NETWORK!!!!
In order to use the database in local, it's just needed to import it in mongo (must be installed)
these are the steps:

1. cd /var/lib/mongodb
2. mongorestore -d database /MMNET_TEAM21/database
3. mongo
4. to see if the database is present, use: show dbs, database should be in the list
5. to use our databae, type: use database
6. to see if it has been loaded, use: show collections. If everything is fine our collections should be listed
7. now in the index.js of the server, it's just needed to comment the var uri used in order to connect to the local db and to decomment
   var uri = "mongodb://127.0.0.1:27017/database";


MOBILE APPLICATION
All the code is written in the index.js file, placed in src_mobile/index.js

The project has been already built, and the apk is placed in src_mobile/bin/iBeacons.apk
this app has been built for android 4.4.4 and 4.4.2

in mobile_src/doc is possible to see the documentation used for the beacons detection.

mobile_src isn't the hole project folder, it contains only the index.js (where we wrote the code) and the already built apk!

It was too big to upload the entire folder. If you want to modify the project, just create a new alloy project on titanium;
in the project folder past the folder "/src_mobile/modules", and in "/app/controllers/" copy the /src_mobile/index.js file

NOTE: on the settings page of our mobile app, is possible to set the ip or url of the server, together with the port number.
It's also possible to change the threshold used in order to detect the beacons and to distinguish between the different reagions.
This is because it's impossible to know a priori how to set them, in fact they depend on the environment in which the beacons are placed, together with the power used for the trasmission.
In our apartment we set them with these values: th1= -82 dBm th1= -78 dBm, th both= -92 dBm.