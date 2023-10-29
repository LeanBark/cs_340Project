/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT        = 8181;                 // Set a port number at the top so it's easy to change in the future

// Handlebars template
// app.js

const { engine } = require('express-handlebars');
var exphbs = require("express-handlebars");     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Database
var db = require('./db-connector')

/*
    ROUTES
*/
// app.js

app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Characters;";
        let query2 = "SELECT * FROM Races;";
        let query3 = "SELECT * FROM Classes;";
        db.pool.query(query1, function(err, rows, fields){
            let characters = rows;
            db.pool.query(query2, (err, rows, fields) => {
                let races = rows;
                // let raceMap = {}
                // races.map(race => {
                //     let race_id = parseInt(race.race_id, 10);
                //     raceMap[race_id] = race["name"];
                // })
                // characters = characters.map(character => {
                //     return Object.assign(character, {race_id: raceMap[character.race_id]})
                // })
                db.pool.query(query3, (err, rows, fields) => {
                    let classes = rows;
                    return res.render('index', {data: characters, races: races, classes: classes});
                })
                // db.pool.query(query3, (err, rows, fields) => {
                //     let classes = rows;
                //     let classMap = {};
                //     classes.map(classy => {
                //         let class_id = parseInt(classy.class_id, 10);
                //         classMap[class_id] = classy["name"];
                //     });
                //     characters = characters.map(character => {
                //         return Object.assign(character, {race_id : raceMap[character.race_id]}, {class_id: classMap[character.class_id]});
                //     });
                //     return res.render('index', {data: characters, races: races, classes: classes});
                // })
                                
            })
        })
    });

app.post('/add-character', function(req, res)
{
    let data = req.body;
    let level = parseInt(data.level);
    if (isNaN(level)){
        level = 1;
    }
    let strength = parseInt(data.strength);
    if (isNaN(strength)){
        strength = 10;
    }
    let dexterity = parseInt(data.dexterity);
    if (isNaN(dexterity)){
        dexterity = 10;
    }
    let constitution = parseInt(data.constitution);
    if (isNaN(constitution)){
        constitution = 10;
    }
    let intelligence = parseInt(data.intelligence);
    if (isNaN(intelligence)){
        intelligence = 10;
    }
    let wisdom = parseInt(data.wisdom);
    if (isNaN(wisdom)){
        wisdom = 10;
    }
    let charisma = parseInt(data.charisma);
    if (isNaN(charisma)){
        charisma = 10;
    }
    let race_id = parseInt(data.race_id);
    if (isNaN(race_id)){
        race_id = NULL;
    }
    let class_id = parseInt(data.class_id);
    if (isNaN(class_id)){
        class_id = NULL;
    }

    query2 = `INSERT INTO Characters (name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, race_id, class_id)
    VALUES ('${data.name}','${data.level}','${data.strength}','${data.dexterity}', '${data.constitution}', '${data.intelligence}', '${data.wisdom}',
    '${data.charisma}', '${data.race_id}', '${data.class_id}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            query3 = `SELECT * FROM Characters;`;
            db.pool.query(query3, function(error, rows, fields){
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                } else 
                {
                    res.send(rows);
                }
            })
        }
    })
});                                         // will process this file, before sending the finished HTML to the client.
// /*
//     LISTENER
// */
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


                