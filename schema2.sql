
-------------------------------------CREATE TABLES--------------------------------------


CREATE OR REPLACE TABLE Races (
    race_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    description text,
    PRIMARY KEY (race_id)
    -- CONSTRAINT race_name UNIQUE (race_id,name)
);

CREATE OR REPLACE TABLE Classes (
    class_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    description text,
    PRIMARY KEY (class_id)
    -- CONSTRAINT class_name UNIQUE (class_id,name)
);

CREATE OR REPLACE TABLE ItemTypes (
    item_type_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (item_type_id)
    -- CONSTRAINT item_type UNIQUE (item_type_id, name)
);

CREATE OR REPLACE TABLE Actions (
    action_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (action_id)
    -- CONSTRAINT action_name UNIQUE (action_id, name)
);

CREATE OR REPLACE TABLE DifficultyClasses (
    difficulty_class_id int NOT NULL AUTO_INCREMENT,
    value int UNIQUE NOT NULL, -- placed unique identifier here instead
    description text,
    PRIMARY KEY (difficulty_class_id)
    -- CONSTRAINT difficulty_type UNIQUE (difficulty_class_id, value)
);

CREATE OR REPLACE TABLE Items (
    item_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    item_type_id int,
    PRIMARY KEY (item_id),  -- composite key 
    FOREIGN KEY (item_type_id) REFERENCES ItemTypes(item_type_id)
    -- CONSTRAINT item_identity UNIQUE (name, item_type_id)
);

CREATE OR REPLACE TABLE Characters (
    character_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    level int NOT NULL DEFAULT 1,
    strength int NOT NULL DEFAULT 10,
    dexterity int NOT NULL DEFAULT 10,
    constitution int NOT NULL DEFAULT 10,
    intelligence int NOT NULL DEFAULT 10,
    wisdom int NOT NULL DEFAULT 10,
    charisma int NOT NULL DEFAULT 10,
    race_id int,
    class_id int,
    PRIMARY KEY (character_id),
    FOREIGN KEY (race_id) REFERENCES Races (race_id),
    FOREIGN KEY (class_id) REFERENCES Classes (class_id)
);

-- CREATE OR REPLACE TABLE CharacterDetails (
--     id int NOT NULL AUTO_INCREMENT,
--     character_id int NOT NULL,
--     race_id int NOT NULL,
--     class_id int NOT NULL,
--     PRIMARY KEY (id)
-- );

CREATE OR REPLACE TABLE SkillChecks (
    skill_check_id int NOT NULL AUTO_INCREMENT,
    description text,
    roll_result int NOT NULL,
    difficulty_class_id int,
    PRIMARY KEY (skill_check_id),
    FOREIGN KEY (difficulty_class_id) REFERENCES DifficultyClasses (difficulty_class_id)
);

CREATE OR REPLACE TABLE SkillCheckDetails (
    skill_check_details_id int NOT NULL AUTO_INCREMENT,
    action_id int,
    character_id int,
    item_id int,
    skill_check_id int,
    skill_check_success tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (skill_check_details_id),
    FOREIGN KEY (action_id) REFERENCES Actions (action_id),
    FOREIGN KEY (character_id) REFERENCES Characters (character_id),
    FOREIGN KEY (item_id) REFERENCES Items (item_id),
    FOREIGN KEY (skill_check_id) REFERENCES SkillChecks (skill_check_id)
);



--------------------------INSERT SAMPLE VALUES--------------------------------------

-----------------------POPULATING RACES TABLE--------------------------------------
INSERT INTO Races (
    name
)
VALUES 
    ("Dwarf"),
    ("Dragonborn"),
    ("Drow"),
    ("Elf"),
    ("Gnome"),
    ("Githyanki"),
    ("Half-Elf"),
    ("Half-Orc"),
    ("Halfling"),
    ("Human"),
    ("Tiefling"),
    ("Orc");

------------------------------POPULATING CLASSES TABLE---------------------------
INSERT INTO Classes (
    name
)
VALUES
    ("Rogue"),
    ("Ranger"),
    ("Warlock"),
    ("Wizard"),
    ("Barbarian"),
    ("Fighter"),
    ("Druid"),
    ("Paladin"),
    ("Cleric"),
    ("Sorceror"),
    ("Monk"),
    ("Artificier"),
    ("Bard");

---------------------------POPULATING ITEMTYPES TABLE------------------------------
INSERT INTO ItemTypes (
    name
)
VALUES
    ("Potion"),
    ("Scroll"),
    ("Armor"),
    ("Weapon"),
    ("Amulet"),
    ("Ring");


---------------------------POPULATING ACTIONS TABLE-----------------------------
INSERT INTO Actions (
    name
)
VALUES
    ("Jump"),
    ("Dash"),
    ("Hide"),
    ("Throw"),
    ("Shove"),
    ("Class-Action"),
    ("Race-Action");


------------------------POPULATING DIFFICULTYCLASSES TABLE----------------------
INSERT INTO DifficultyClasses (
    value,
    description
)
VALUES
    (2, "Very Easy"),
    (5, "Easy"),
    (10, "Moderate"),
    (15, "Difficult"),
    (20, "Very Difficult"),
    (30, "Extreme");


-------------------POPULATING CHARACTERS TABLE------------------------------

-- VERSION 1: hard-coded FK race and class id values
INSERT INTO Characters (
    name,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    race_id,
    class_id
)
VALUES
    ("Bob", 2, 10, 11, 12, 15, 17, 10, 
    10, 6),
    ("Zara", 5, 12, 13, 12, 11, 9, 14, 
    11, 3),
    ("Fred", 10, 10, 17, 14, 9, 16, 10, 
    7, 11);

-- VERSION 2: Subqueries used to select race_id, class_id by specified values (commented out)
-- INSERT INTO Characters (
--     name,
--     level,
--     strength,
--     dexterity,
--     constitution,
--     intelligence,
--     wisdom,
--     charisma,
--     race_id,
--     class_id
-- )
-- VALUES
--     (
--         (SELECT character_id FROM Characters WHERE Characters.name = "beginner"),
--         (SELECT race_id FROM Races WHERE Races.name = "Human"), 
--         (SELECT class_id FROM Classes WHERE Classes.name = "Cleric")
        
--     ),
--     (
--         (SELECT character_id FROM Characters WHERE Characters.name = "intermediate"),
--         (SELECT race_id FROM Races WHERE Races.name = "Tiefling"), 
--         (SELECT class_id FROM Classes WHERE Classes.name = "Warlock")
        
--     ),
--     (
--         (SELECT character_id FROM Characters WHERE Characters.name = "expert"), 
--         (SELECT race_id FROM Races WHERE Races.name = "Half-Elf"),
--         (SELECT class_id FROM Classes WHERE Classes.name = "Monk")
--     );

-------------------------POPULATING ITEMS TABLE----------------------------------

---VERSION 1: Hard-coded FK item_type_id values
INSERT INTO Items (
    name,
    item_type_id
)
VALUES 
    ("Elixer of Cloud Giant", 1),
    ("Boots of Speed", 3),
    ("Staff of Fireball", 4),
    ("Scroll of Charm", 2),
    ("Necklace of Intelligence", 5),
    ("Ring of Invisibility", 6);


-- Version 2: Select subqueries to retrieve FK values (commented out)
-- INSERT INTO Items (
--     name,
--     item_type_id
-- )
-- VALUES 
    --     (
    --     "Elixer of Cloud Giant",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Potion")
    -- ),
    -- (
    --     "Boots of Speed",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Armor")
    -- ),
    -- (
    --     "Staff of Fireball",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Weapon")
    -- ),
    -- (
    --     "Scroll of Charm Humanoid",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Scroll")
    -- ),
    -- (
    --     "Necklace of Intelligence",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Amulet")
    -- ),
    -- (
    --     "Ring of Invisibility",
    --     (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Ring")
    -- );

-----------------------------POPULATING SKILLCHECKS TABLE-------------------

-- Version 1: Hard-coded FK values for difficulty class
INSERT INTO SkillChecks (
    description,
    roll_result,
    difficulty_class_id
)
VALUES
    ("Attempt to Cross Icy Bridge", 1, 4),
    ("Attempt to Initmidate Bronze Dragon", 20, 6),
    ("Attempt to Sneak Past Spectator", 5, 5);

-- Version 2: select subqueries (commented out)
-- INSERT INTO SkillChecks (
--     description,
--     roll_result,
--     difficulty_class_id
-- )
-- VALUES
--     ("Attempt to Cross Icy Bridge", 1,
--     SELECT difficulty_class_id FROM DifficultyClasses WHERE DifficultyClasses.name = "Moderate"),
--     ("Attempt to Initmidate Bronze Dragon", 20,
--     SELECT difficulty_class_id FROM DifficultyClasses WHERE DifficultyClasses.name = "Very Difficult"),
--     ("Attempt to Sneak Past Spectator", 5,
--     SELECT difficulty_class_id FROM DifficultyClasses WHERE DifficultyClasses.name = "Difficult");

-----------------------------POPULATING SKILLCHECKDETAILS-------------------------------------

-- Version 1: Hard-coded FK values for actions, items, characters, skill_checks
INSERT INTO SkillCheckDetails (
    action_id,
    character_id,
    item_id,
    skill_check_id
)
VALUES
    (2, 1, 2, 1),
    (6, 2, 4, 2),
    (3, 3, 6, 3);


--Version 2: Select subqueries to insert FKs (commented out)
-- INSERT INTO SkillCheckDetails (
--     action_id,
--     character_id,
--     item_id,
--     skill_check_id
-- )
-- VALUES
--     (SELECT action_id FROM Actions WHERE Actions.name = "Class-Based Action"),
--     (SELECT character_id FROM Characters WHERE Characters.name = "expert"),
--     (SELECT item_id FROM Items WHERE Items.name = "Boots of Speed"),
--     (SELECT skill_check_id FROM SkillChecks WHERE SkillChecks.description = "Attempt to Cross Icy Bridge");


----------------------------SAMPLE DATA SETS--------------------------------------------------------------------

-- SCENARIOS FOR PRESET DATA SAMPLE VALUES------------------------------

-- SAMPLE DATA SET # 1
-- CHARACTER DETAILS --------------------------
-- Character_id = 1 
-- Character.name = "Bob"
-- Character.race_id = 10 -> "Human"
-- Character.class_id = 6 -> "Fighter"
--------EVENT DETAILS-----------------------------
-- SkillCheckDetails.action_id = 2 -> "Dash"
-- SkillCheckDetails.item_id = 2 -> "Boots of Speed" 
        ---> Items.item_type_id = 3 -> "Armor"
-- SkillCheckDetails.skill_check_id = 1 
        ---> SkillChecks.difficulty_class_id = 4 -> "Difficult"
        ---> SkillChecks.description = ""Attempt to Cross Icy Bridge""



-- SAMPLE DATA SET # 2
-- CHARACTER DETAILS --------------------------
-- Character_id = 2 
-- Character.name = "Zara"
-- Character.race_id = 11 -> "Tiefling"
-- Character.class_id = 3 -> "Warlock"
--------EVENT DETAILS-----------------------------
-- SkillCheckDetails.action_id = 6 -> "Class-Action"
-- SkillCheckDetails.item_id = 4 -> "Scroll of Charm" 
        ---> Items.item_type_id = 2 -> "Scroll"
-- SkillCheckDetails.skill_check_id = 2 
        ---> SkillChecks.difficulty_class_id = 6 -> "Extreme"
        ---> SkillChecks.description = ""Attempt to Initmidate Bronze Dragon""



-- SAMPLE DATA SET # 3
-- CHARACTER DETAILS --------------------------
-- Character_id = 3 
-- Character.name = "Fred"
-- Character.race_id = 7 -> "Half-Elf"
-- Character.class_id = 11 -> "Monk"
--------EVENT DETAILS-----------------------------
-- SkillCheckDetails.action_id = 3 -> "Hide"
-- SkillCheckDetails.item_id = 6 -> "Ring of Invisibility" 
        ---> Items.item_type_id = 6 -> "Ring"
-- SkillCheckDetails.skill_check_id = 3 
        ---> SkillChecks.difficulty_class_id = 5 -> "Very Difficult"
        ---> SkillChecks.description = ""Attempt to Sneak Past Spectator""


-------------------------------------------------TEST QUERIES----------------------------------------------------

-- --- Query determines whether Items and ItemTypes are properly associated and return expected value pairs
-- SELECT Items.name AS "Item name", ItemTypes.name AS "Item Type" 
-- FROM Items INNER JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id;


-- --- Query determines whether Characters, Races, Items return expected value pairs
-- SELECT Characters.name AS "Character Name", Characters.strength, Characters.wisdom, Races.name AS "Race",
-- Classes.name AS "Class" 
-- FROM ((Characters 
-- INNER JOIN Races ON Characters.race_id = Races.race_id)
-- INNER JOIN Classes ON Characters.class_id = Classes.class_id);


-- --- Query determines whether Characters, SkillChecks, Actions, Items all form correct value pairs within SkillCheckDetails Table
-- SELECT Characters.name AS "Character", SkillChecks.description AS "Skill Check Event", Items.name AS "Item used", Actions.name AS "Action used" 
-- FROM ((((SkillCheckDetails
-- INNER JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id)
-- INNER JOIN Items ON SkillCheckDetails.item_id = Items.item_id)
-- INNER JOIN Actions ON SkillCheckDetails.action_id = Actions.action_id)
-- INNER JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id);


-- --- Query determines whether attributes associated with different entities within SkillCheckDetails are correctly returned
-- SELECT Characters.race_id AS "Race ID", Characters.class_id AS "Class ID", SkillChecks.roll_result AS "Roll Value", Items.item_type_id AS "Item type ID"
-- FROM (((SkillCheckDetails
-- INNER JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id)
-- INNER JOIN Items ON SkillCheckDetails.item_id = Items.item_id)
-- INNER JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id);

-- SELECT Characters.name AS "Character", Races.name AS "Race", Classes.name AS "Class" 
-- FROM ((Characters
-- INNER JOIN Races ON Characters.race_id = Races.race_id)
-- INNER JOIN Classes ON Characters.class_id = Classes.class_id);

-- SELECT Items.name AS "Item name", ItemTypes.name AS "Item Type"
-- FROM Items INNER JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id;


-- -- DELETION OPERATIONS ---------------------
-- -- NOTE: FOR DELETE/UPDATE OPERATIONS, you must select by primary key values and set foreign key checks off

-- -- Query deletes a Character and checks to make sure tables with relations were not deleted
-- DELETE FROM Characters WHERE Characters.character_id = 1; -- delete character
-- SELECT * FROM Characters; -- confirm deletion from Characters table
-- SELECT * FROM Races; -- check for alterations in Races table 
-- SELECT * FROM Classes; -- check for alterations in Classes table

-- -- Query updates a Character's name, race_id, and class_id then checks to see if changes were properly made
-- UPDATE Characters SET Characters.name = "Bob", Characters.race_id = 2, Characters.class_id = 4 WHERE Characters.character_id = 2;


-- -- Query deletes an item from Items table
-- DELETE FROM Items WHERE Items.item_id = 1;
-- select * from Items; -- confirm deletion of item 
-- select * from ItemTypes; -- check for alterations in ItemsTypes table