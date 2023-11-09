// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP WEB APP
*/

// Setup Express
var express = require('express');   
var app     = express();                        // We need to instantiate an express object to interact with the server in our code
app.use(express.json());                        // Allow express to handle JSON data
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT        = 8182;                             // Set a port number at the top so it's easy to change in the future

// Setup Handlebars
const { engine } = require('express-handlebars');
var exphbs = require("express-handlebars");     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Setup Database
var db = require('./database/db-connector')

/*
    DEFINE ROUTES
*/

// Show Home Page
app.get('/', function(req,res){
    res.render('home');
});

// Characters Table - Show 
app.get('/characters', function(req, res)
    {
        let query1 = "SELECT character_id, Characters.name AS Name, level AS Level, strength AS Strength, dexterity AS Dexterity, constitution AS Constitution, intelligence AS Intelligence, wisdom AS Wisdom, charisma AS Charisma, Races.name AS Race, Classes.name AS Class FROM Characters JOIN Races on Characters.Race_Id = Races.Race_Id JOIN Classes on Characters.Class_Id = Classes.Class_Id ORDER BY character_id ASC;";
        let query2 = "SELECT * FROM Races ORDER BY race_id ASC;";
        let query3 = "SELECT * FROM Classes ORDER BY class_id ASC;";
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

// Characters Table - Insert Row    
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
            // query3 = `SELECT * FROM Characters ORDER BY character_id ASC;`;
            query3 = "SELECT character_id, Characters.name as name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, Races.name AS race_id, Classes.name AS class_id FROM Characters JOIN Races ON Characters.race_id = Races.race_id JOIN Classes ON Characters.class_id = Classes.class_id ORDER BY character_id ASC;";
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

// Characters Table - Update Row 
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
    let selectCharacter = `SELECT level, strength, dexterity, constitution, intelligence, wisdom, charisma, Races.name AS race, Classes.name AS class FROM Characters JOIN Races ON Characters.race_id = Races.race_id JOIN Classes ON Characters.class_id = Classes.class_id WHERE character_id = ?;`;

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


// Races Table - display all races
app.get('/races', function(req,res){
    let query1 = 'SELECT race_id, Races.name AS Name, Races.description AS Description FROM Races ORDER BY race_id ASC;';
    db.pool.query(query1, function(err, rows, fields){
        res.render('races', {data:rows});
    })
});

// Races Table - add a new race
app.post('/add-race', function(req, res)
{
    let data = req.body;

    // NESTED QUERIES
    query2 = `INSERT INTO Races (name, description) VALUES ('${data.name}','${data.description}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            query3 = `SELECT * FROM Races ORDER BY race_id ASC;`;
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

// Classes Table - display all classes
app.get('/classes', function(req,res){
    let query1 = `SELECT class_id, Classes.name AS Name, Classes.description AS Description FROM Classes ORDER BY class_id ASC;`;
    db.pool.query(query1, function(err, rows, fields){
        res.render('classes', {data:rows});
    })
});

// Classes Table - add a new class
app.post('/add-class', function(req, res)
{
    let data = req.body;

    // NESTED QUERIES
    query2 = `INSERT INTO Classes (name, description) VALUES ('${data.name}','${data.description}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            query3 = `SELECT * FROM Classes ORDER BY class_id ASC;`;
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

// Actions Table - Show
app.get('/actions', function(req, res){
    let query1 = `SELECT action_id, Actions.name AS Name FROM Actions ORDER BY action_id ASC;`;
    db.pool.query(query1, function(err, rows, fields){
        res.render('actions', {data: rows});
    })
});

// Actions Table - Insert Row
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
            let query3 = `SELECT * FROM Actions ORDER BY action_id ASC;`;
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

// Event Difficulties Table - display all event difficulties
app.get('/difficulties', function(req,res){
    let query1 = `SELECT difficulty_id, EventDifficulties.value AS Value, EventDifficulties.description AS Description FROM EventDifficulties ORDER BY difficulty_id ASC;`;
    db.pool.query(query1, function(err, rows, fields){
        res.render('difficulties', {data:rows});
    })
});

// Event Difficulties Table - add a new event difficulty
app.post('/add-difficulty', function(req, res)
{
    let data = req.body;
    let rollValue = parseInt(data.value);
    if (isNaN(rollValue)){
        rollValue = 1;
    }
    // NESTED QUERIES
    query2 = `INSERT INTO EventDifficulties (value, description) VALUES ('${data.value}','${data.description}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            query3 = `SELECT * FROM EventDifficulties ORDER BY difficulty_id ASC;`;
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

// Actions Table - Show
app.get('/actions', function(req, res){
    let query1 = "SELECT action_id, Actions.name AS Name FROM Actions ORDER BY action_id ASC;";
    db.pool.query(query1, function(err, rows, fields){
        res.render('actions', {data: rows});
    })
});

// Actions Table - Insert Row
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
            let query3 = `SELECT * FROM Actions ORDER BY action_id ASC;`;
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


// Skill Checks Table - Show
app.get('/events', function(req, res){
    let query1 = "SELECT skill_check_id, SkillChecks.description AS Description, roll_result AS \"Roll Result\", EventDifficulties.description AS Difficulty, EventDifficulties.value AS \"Difficulty Value\" FROM SkillChecks JOIN EventDifficulties ON SkillChecks.difficulty_id = EventDifficulties.difficulty_id ORDER BY skill_check_id ASC;";
    let query2 = "SELECT * FROM EventDifficulties ORDER BY difficulty_id ASC;";
    db.pool.query(query1, function(err, rows, fields){
        let checkEvents = rows;
        db.pool.query(query2, function(err, rows, fields){
            let difficulties = rows;
            return res.render('events', {data: checkEvents, difficulties: difficulties});
        })
    })
});

// Skill Check Table - Insert Row
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
            let query3 = `SELECT * FROM SkillChecks JOIN EventDifficulties ON SkillChecks.difficulty_id = EventDifficulties.difficulty_id ORDER BY skill_check_id ASC;`;
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

// Skill Check Table - Update
app.put('/update-event', function (req, res, next){
    let data = req.body;
    
    // SANITIZE/FILTER INPUTS
    let event = parseInt(data.event);
    let roll = parseInt(data.roll);
    if (isNaN(roll)){
        roll=1;
    }
    let difficulty = parseInt(data.difficulty);
    if(isNaN(difficulty)){
        difficulty = NULL;
    }

    // NESTED DATABASE QUERIES
    let queryUpdateMaster = `UPDATE SkillChecks SET roll_result = ?, difficulty_id = ? WHERE skill_check_id = ?;`;
    let selectEvent = `SELECT skill_check_id, roll_result, value, EventDifficulties.description AS difficulty FROM SkillChecks JOIN EventDifficulties ON SkillChecks.difficulty_id = EventDifficulties.difficulty_id WHERE skill_check_id = ?;`;

    db.pool.query(queryUpdateMaster, [roll, difficulty, event], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectEvent, [event], function(error, rows, fields){
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

// Skill Check Table - Delete
app.delete('/delete-event-ajax', function(req, res, next){
    let data = req.body;
    let skill_check_id = parseInt(data.id);
    let query1 = "DELETE FROM SkillChecks WHERE skill_check_id = ?;";

    // Run query
    db.pool.query(query1, [skill_check_id], function(error, rows, fields){
        if (error) {

            // Log error
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }    
})});


// Skill Check Details Table - Show
app.get('/event-details', function(req, res){
    let query1 = "SELECT skill_check_details_id, Actions.name AS \"Action\", Characters.name AS \"Character\", IF(SkillCheckDetails.item_id IS NOT NULL, Items.name, \"None\") AS \"Item\", SkillChecks.description AS \"Description\" FROM SkillCheckDetails JOIN Actions ON SkillCheckDetails.action_id = Actions.action_id JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id LEFT JOIN Items ON SkillCheckDetails.item_id = Items.item_id JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id ORDER BY skill_check_details_id ASC;";
    let query2 = "SELECT * FROM Actions ORDER BY action_id ASC;"
    let query3 = "SELECT * FROM Characters ORDER BY character_id ASC;"
    let query4 = "SELECT * FROM Items ORDER BY item_id ASC;"
    let query5 = "SELECT * FROM SkillChecks ORDER BY skill_check_id ASC;"
    db.pool.query(query1, function(err, rows, fields){
        let checkEventDetails = rows;
        db.pool.query(query2, function(err, rows, fields){
            let actions = rows;
            db.pool.query(query3, function(err, rows, fields){
                let characters = rows;
                db.pool.query(query4, function(err, rows, fields){
                    let items = rows;
                    db.pool.query(query5, function(err, rows, fields){
                        let skill_checks = rows;
                        return res.render('event-details', {data: checkEventDetails, actions: actions, characters: characters, items: items, skill_checks: skill_checks});
                    })
                })
            })
        })
    })
});

// Skill Check Details Table - Insert Row
app.post('/add-event-details', function(req, res){
    let data = req.body;

    //NESTED DATABASE QUERIES
    let query1 = `INSERT INTO SkillCheckDetails (action_id, character_id, item_id, skill_check_id) VALUES ('${data.action_id}','${data.character_id}', '${data.item_id}', '${data.skill_check_id}');`;
    if (data.item_id == "NULL"){
        query1 = `INSERT INTO SkillCheckDetails (action_id, character_id, item_id, skill_check_id) VALUES ('${data.action_id}','${data.character_id}', NULL, '${data.skill_check_id}');`;
    }
    db.pool.query(query1, function (error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            let query2 = "SELECT skill_check_details_id, Actions.name AS \"Action\", Characters.name AS \"Character\", IF(SkillCheckDetails.item_id IS NOT NULL, Items.name, \"None\") AS \"Item\", SkillChecks.description AS \"Description\" FROM SkillCheckDetails JOIN Actions ON SkillCheckDetails.action_id = Actions.action_id JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id LEFT JOIN Items ON SkillCheckDetails.item_id = Items.item_id JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id ORDER BY skill_check_details_id ASC;";
            db.pool.query(query2, function(error, rows, fields){
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

// Skill Check Details Table - Delete
app.delete('/delete-event-details-ajax', function(req,res,next){
    let data = req.body;
    let skill_check_details_id = parseInt(data.id);
    let query1 = "DELETE FROM SkillCheckDetails WHERE skill_check_details_id = ?";

    // Run query
    db.pool.query(query1, [skill_check_details_id], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal and send a 400 error
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
})});

// Items Table - Show
app.get('/items', function(req,res){
    let query1 = "SELECT item_id, Items.name AS Name, quantity as Quantity, ItemTypes.name As \"Item Type\" FROM Items JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id ORDER BY item_id ASC;";
    let query2 = "SELECT * FROM ItemTypes ORDER BY item_type_id ASC;";
    db.pool.query(query1, function(err, rows, fields){
        let items = rows;
        db.pool.query(query2, function(err, rows, fields){
            let types = rows;
            return res.render('items', {data: items, types: types});
        })
        
    })
});

// Items Table - Insert Row
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
            let query3 = `SELECT item_id, Items.name AS name, quantity, ItemTypes.name AS type FROM Items JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id ORDER BY item_id ASC;`;
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

// Items Table - Update Row
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
    let selectItem = `SELECT quantity, ItemTypes.name AS item_type_id FROM Items JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id WHERE item_id = ?;`;

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


// Item Types Table - display all item types
app.get('/item-types', function(req,res){
    let query1 = `SELECT item_type_id, ItemTypes.name AS Name FROM ItemTypes ORDER BY item_type_id ASC;`;
    db.pool.query(query1, function(err, rows, fields){
        res.render('item-types', {data:rows});
    })
});

// Item Types Table - add a new item type
app.post('/add-item-type', function(req, res)
{
    let data = req.body;
    // NESTED QUERIES
    query2 = `INSERT INTO ItemTypes (name) VALUES ('${data.name}');`;
    db.pool.query(query2, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            query3 = `SELECT * FROM ItemTypes ORDER BY item_type_id ASC;`;
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
/*
     DEFINE LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});