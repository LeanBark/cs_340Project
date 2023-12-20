Creating this app from a git clone

Change directory to "ajax-handlebar-ui"
Enter "npm install" to add all packages listed as dependencies in package.json
Create db-connector.js file inside "database" folder with format:
  var mysql = require("mysql");
  var pool = mysql.createPool({
   hostname: "hosting server's address" if not "localhost",
   user: "username associated with database",
   password: "password associated with user",
   database: "name of database to be accessed"
   });
   module.exports.pool = pool;

Remotely Accessing the app using OSU Flip server:

node app.js
ensure that VPN to vpn.oregonstate.edu is active
http://flipNUMBER.engr.oregonstate.edu:PORT/ 

Using forever

forever start app.js
forever list
forever stopall

Setting up the database

Use database/DDL.sql as the source



Locally Accessing the app using a local machine as hosting server:

Download the MariaDB server from https://mariadb.org/download/ to local machine
 - NOTE: During installation process, make sure to set and record password to access local MariaDB and its location


In MariaDB folder:
 - Open Command Prompt
 - Enter "mariadb -u your_username -p" then enter your password when prompted
 - Enter "CREATE DATABASE new_database_name;" to create a new database
 - Enter "USE new_database_name;" to select the new database
 - Determine the file path between the .ini file in "data" folder and your git clone's "DDL.sql" file on your local machine
 - Enter "source 'your_local_file_path';" to fill the new database with the DDL's tables and data

In IDE terminal:
- Enter "node app,js" to run Express server

You should now be able to access a locally-hosted version of the app at the address "http://localhost:PORT"

Citations

Citation for the AJAX/app.js/express-handlebars design:
 Date: 11/7/2023
 Adapted from OSU CS340 NodeJS Starter App
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

Citation for Icons:
 Date: 11/20/2023
 Icons for Submit, Delete, and Edit buttons were provided from svgrepo.com
 Source URL for Edit Icons: https://www.svgrepo.com/svg/511904/edit-1479
 Source URL for Submit Icons:https://www.svgrepo.com/svg/494419/submit-success-check-mark
 Source Url for Delete Icons: https://www.svgrepo.com/svg/499905/delete

Citation for Font Families
 Date: 11/20/2023
 Font Family ttfs obtained from fontrepo.com
 Source URL: https://www.fontrepo.com/font/360/adventure-request
 Source URL: https://www.fontrepo.com/fonts/adventure-subtitles/

Citation for GIFs
 Date: 11/21/2023
 GIFs for Critical Success and Critical Failure
 Source URL for Critical Success GIF: https://giphy.com/gifs/hyperrpg-dnd-roguelike-rogue-like-8cGXy3fskyacePqILB
 Source URL for Critical Failure GIF: https://giphy.com/gifs/dnd-d20-zxyllia-oOBTO2UcSoaBJewZT0

Citation for Bootstrap:
 Date: 12/4/2023
 Bootstrap utility for layout design/styling obtained from https://getbootstrap.com
 Source URL: https://getbootstrap.com/docs/5.3/getting-started/introduction/

Citation for the rotating D20 dice images:
 Date: 11/16/2023
 Credit attributed to: 

    Dice 20 faces 20 icon by Delapouite under CC BY 3.0
     Source URL: https://game-icons.net/1x1/delapouite/dice-twenty-faces-twenty.html

    Dice 20 faces 1 icon by Delapouite under CC BY 3.0
     Source URL: https://game-icons.net/1x1/delapouite/dice-twenty-faces-one.html

Citation for the CSS to rotate an image using keyframes
 Date: 11/16/2023
 Adapted from Stack Overflow Post - How can I rotate an image for a specific time and then stopping it slowly
 Source URL: https://stackoverflow.com/questions/55458757/how-can-i-rotate-an-image-for-a-specific-time-and-then-stopping-it-slowly

Citation for navbar style
 Date: 11/16/2023
 Adapated from W3 Schools - How TO - Top Navigation
 Soure URL: https://www.w3schools.com/howto/howto_js_topnav.asp
