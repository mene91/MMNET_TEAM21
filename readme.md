SERVER APPLICATION
Nodejs is required with espress, multer, body parser and mongodb.
(npm install express, nmp install multer, npm install body-parser, npm install mongodb)

It's possible to run the server application just entering in src_server and running node index.js

!!!NOTE: THE CONNECTION TO MONGOLAB DOESN'T WORK IN THE UNIVERSITY NETWORK!!!!

MOBILE APPLICATION
All the code is written in the index.js file, placed in src_mobile/index.js

The project has been already built, and the apk is placed in src_mobile/bin/iBeacons.apk
this app has been built for android 4.4.4 and 4.4.2

in mobile_src/doc is possible to see the documentation used for the beacons detection.

mobile_src isn't the hole project folder, it contains only the index.js (where we wrote the code) and the already built apk!
It was too big to upload the entire folder.

NOTE: on the settings page of our mobile app, is possible to set the ip or url of the server, together with the port number.
It's also possible to change the threshold used in order to detect the beacons and to distinguish between the different reagions.
This is because it's impossible to know a priori how to set them, in fact they depend on the environment in which the beacons are placed, together with the power used for the trasmission.
In our apartment we set them with these values: th1= -82 dBm th1= -78 dBm, th both= -92 dBm.