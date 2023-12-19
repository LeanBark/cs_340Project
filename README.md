Creating this app from a git clone

npm init
npm i express --save
npm i forever --save
alias forever='./node_modules/forever/bin/forever'
npm i mysql --save
npm i express-handlebars --save

Accessing the app

node app.js
ensure that VPN to vpn.oregonstate.edu is active
http://flipNUMBER.engr.oregonstate.edu:PORT/ 

Using forever

forever start app.js
forever list
forever stopall

Setting up the database

Use database/DDL.sql as the source

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
