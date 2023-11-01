/*
    SETUP
*/

// Express
var express = require('express');   
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT        = 8181;                 // Set a port number at the top so it's easy to change in the future



const { engine } = require('express-handlebars');
var exphbs = require("express-handlebars");     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Database
var db = require('./db-connector')

/*
    ROUTES
*/

//-----------------------------------------------------------HOME PAGE ROUTES-------------------------------------------------//

app.get('/', function(req,res){
    res.render('home');
});

//-------------------------------------------------------CHARACTERS PAGE ROUTES-----------------------------------------------//

//----------------------------------------READ CHARACTER INFORMATION----------------------------------//
app.get('/characters', function(req, res)
    {
        let query1 = "SELECT * FROM Characters;";
        let query2 = "SELECT * FROM Races;";
        let query3 = "SELECT * FROM Classes;";
        db.pool.query(query1, function(err, rows, fields){
            let characters = rows;
            db.pool.query(query2, (err, rows, fields) => {
                let races = rows;
                db.pool.query(query3, (err, rows, fields) => {
                    let classes = rows;
                    return res.render('characters', {data: characters, races: races, classes: classes});
                })
                                
            })
        })
    });

//-------------------------------------------------ADD/CREATE CHARACTER INFORMATION-------------------------------//    
app.post('/add-character', function(req, res)
{
    let data = req.body;

    // SANITIZE/FILTER INPUTS
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

    // NESTED QUERIES
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
});

//--------------------------------------------UPDATE/EDIT CHARACTER INFORMATION------------------------------------//
app.put('/update-character', function (req, res, next){
    let data = req.body;
    
    // SANITIE/FILTER INPUTS
    let character = parseInt(data.name);
    
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

    // NESTED DATABASE QUERIES
    let queryUpdateMaster = `UPDATE Characters SET level = ?, strength = ?, dexterity = ?, constitution = ?, intelligence = ?, wisdom = ?, charisma = ?,
     race_id = ?, class_id = ? WHERE Characters.character_id = ?;`;
    let selectCharacter = `SELECT * FROM Characters WHERE character_id = ?;`;

    db.pool.query(queryUpdateMaster, [level, strength, dexterity, constitution, intelligence, wisdom, charisma, race_id, class_id, character], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectCharacter, [character], function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});
//-------------------------------------------------------ACTIONS PAGE ROUTES------------------------------------------------------------//

//-------------------------------------READ/DISPLAY ACTIONS TABLE INFORMATION-----------------------------//
app.get('/actions', function(req, res){
    let query1 = "SELECT * FROM Actions;";
    db.pool.query(query1, function(err, rows, fields){
        res.render('actions', {data: rows});
    })
});

//--------------------------------------CREATE/ADD ACTIONS----------------------------------------------//
app.post('/add-action', function(req, res){
    let data = req.body;

    // NESTED DATABASE QUERIES
    let query2 = `INSERT INTO Actions (name) VALUES ('${data.name}');`;
    db.pool.query(query2, function (error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            let query3 = `SELECT * FROM Actions;`;
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
});


//--------------------------------------------------------------SKILL CHECK EVENTS PAGE ROUTES--------------------------------------------//

//------------------------------------------READ/DISPLAY SKILL CHECKS TABLE INFORMATION---------------------//
app.get('/events', function(req, res){
    let query1 = "SELECT * FROM SkillChecks;";
    let query2 = "SELECT * FROM EventDifficulties;";
    db.pool.query(query1, function(err, rows, fields){
        let checkEvents = rows;
        db.pool.query(query2, function(err, rows, fields){
            let difficulties = rows;
            return res.render('events', {data: checkEvents, difficulties: difficulties});
        })
    })
});

//----------------------------------------CREATE/ADD SKILL CHECK EVENT INFORMATION---------------------------//
app.post('/add-event', function(req, res){
    let data = req.body;

    // SANITIE/FILTER INPUTS
    let roll_result = parseInt(data.roll_result);
    if (isNaN(roll_result)){
        roll_result = 1;
    }
    let difficulty_id = parseInt(data.difficulty_id);
    if (isNaN(difficulty_id)){
        difficulty_id = NULL;
    }

    //NESTED DATABASE QUERIES
    let query2 = `INSERT INTO SkillChecks (description, roll_result, difficulty_id) VALUES ('${data.description}','${roll_result}', '${difficulty_id}');`;
    db.pool.query(query2, function (error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            let query3 = `SELECT * FROM SkillChecks;`;
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
});

//--------------------------------------------------------------ITEMS PAGE ROUTES--------------------------------------------------------------//


//-------------------------------------------------------READ/DISPLAY ITEMS TABLE INFORMATION----------------------------------//
app.get('/items', function(req,res){
    let query1 = "SELECT * FROM Items;";
    let query2 = "SELECT * FROM ItemTypes;";
    db.pool.query(query1, function(err, rows, fields){
        let items = rows;
        db.pool.query(query2, function(err, rows, fields){
            let types = rows;
            return res.render('items', {data: items, types: types});
        })
        
    })
});

//-------------------------------------------------------CREATE/ADD ITEM INFORMATION--------------------------------------//
app.post('/add-item', function(req, res)
{
    let data = req.body;

    // SANITIE/FILTER INPUTS
    let quantity = parseInt(data.quantity);
    if (isNaN(quantity)){
        quantity = 1;
    }

    // NESTED DATABASE QUERIES
    let query2 = `INSERT INTO Items (name, quantity, item_type_id) VALUES ('${data.name}','${data.quantity}','${data.item_type_id}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            let query3 = `SELECT * FROM Items;`;
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
});

//---------------------------UPDATE/EDIT ITEM INFORMATION----------------------------//

app.put('/update-item', function (req, res, next){
    let data = req.body;
    
    // SANITIZE/FILTER INPUTS
    let item = parseInt(data.name);
    let quantity = parseInt(data.quantity);
    if (isNaN(quantity)){
        quantity=1;
    }
    let item_type = parseInt(data.item_type_id);
    if(isNaN(item_type)){
        item_type = NULL;
    }

    // NESTED DATABASE QUERIES
    let queryUpdateMaster = `UPDATE Items SET quantity = ?, item_type_id = ? WHERE Items.item_id = ?;`;
    let selectItem = `SELECT * FROM Items WHERE item_id = ?;`;

    db.pool.query(queryUpdateMaster, [quantity, item_type, item], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectItem, [item], function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// /*
//     LISTENER
// */
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


                