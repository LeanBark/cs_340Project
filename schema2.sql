-------------------------------------CREATE TABLES--------------------------------------


CREATE OR REPLACE TABLE Races (
    race_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text,
    PRIMARY KEY (race_id)
);

CREATE OR REPLACE TABLE Classes (
    class_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    description text,
    PRIMARY KEY (class_id)
);

CREATE OR REPLACE TABLE ItemTypes (
    item_type_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (item_type_id)
);

CREATE OR REPLACE TABLE Actions (
    action_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (action_id)
);

CREATE OR REPLACE TABLE EventDifficulties (
    difficulty_id int NOT NULL AUTO_INCREMENT,
    value int UNIQUE NOT NULL,
    description text,
    PRIMARY KEY (difficulty_id)
);

CREATE OR REPLACE TABLE Items (
    item_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) UNIQUE NOT NULL,
    quantity int NOT NULL DEFAULT 1,
    item_type_id int,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_type_id) REFERENCES ItemTypes(item_type_id)
    ON DELETE SET NULL
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
    FOREIGN KEY (race_id) REFERENCES Races (race_id)
    ON DELETE SET NULL,
    FOREIGN KEY (class_id) REFERENCES Classes (class_id)
    ON DELETE SET NULL
);

CREATE OR REPLACE TABLE SkillChecks (
    skill_check_id int NOT NULL AUTO_INCREMENT,
    description text,
    roll_result int NOT NULL,
    difficulty_id int,
    PRIMARY KEY (skill_check_id),
    FOREIGN KEY (difficulty_id) REFERENCES EventDifficulties (difficulty_id)
    ON DELETE SET NULL
);

CREATE OR REPLACE TABLE SkillCheckDetails (
    skill_check_details_id int NOT NULL AUTO_INCREMENT,
    action_id int,
    character_id int,
    item_id int,
    skill_check_id int,
    PRIMARY KEY (skill_check_details_id),
    FOREIGN KEY (action_id) REFERENCES Actions (action_id)
    ON DELETE SET NULL,
    FOREIGN KEY (character_id) REFERENCES Characters (character_id)
    ON DELETE SET NULL,
    FOREIGN KEY (item_id) REFERENCES Items (item_id)
    ON DELETE SET NULL,
    FOREIGN KEY (skill_check_id) REFERENCES SkillChecks (skill_check_id)
    ON DELETE CASCADE
);



--------------------------INSERT SAMPLE VALUES--------------------------------------

-----------------------POPULATING RACES TABLE--------------------------------------
INSERT INTO Races (
    name,
    description
)
VALUES 
    ("Dwarf", "STR Proficiency"),
    ("Dragonborn", "CON Proficiency"),
    ("Drow", "DEX Proefiency"),
    ("Elf", "DEX Proficiency"),
    ("Gnome", "DEX Proficiency"),
    ("Githyanki", "WIS Proficiency"),
    ("Half-Elf", "DEX Proficiency"),
    ("Half-Orc", "CON Proficiency"),
    ("Halfling", "DEX Proficiency"),
    ("Human", "CHR Proficiency"),
    ("Tiefling", "CON Profiency"),
    ("Orc", "STR Profiency");

------------------------------POPULATING CLASSES TABLE---------------------------
INSERT INTO Classes (
    name,
    description
)
VALUES
    ("Rogue", "Persuasion/Deception Prof."),
    ("Ranger", "Survival/Nature Prof."),
    ("Warlock", "Arcana/Persuasion Prof."),
    ("Wizard", "Arcana/History Prof."),
    ("Barbarian", "Intimidation/Athletics Prof."),
    ("Fighter", "Athletics/Intimidation Prof."),
    ("Druid", "Nature/Arcana Prof."),
    ("Paladin", "Persuasion/Intimidation Prof."),
    ("Cleric", "Arcana/Religion Prof." ),
    ("Sorceror", "Arcana/History Prof."),
    ("Monk", "Performance/Athletics Prof."),
    ("Artificier", "History/Perfomance Prof."),
    ("Bard", "Performance/Persuasion Prof.");

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
INSERT INTO EventDifficulties (
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


-------------------------POPULATING ITEMS TABLE----------------------------------

INSERT INTO Items (
    name,
    quantity,
    item_type_id
)
VALUES 
    ("Elixer of Cloud Giant", 2, 1),
    ("Boots of Speed", 1, 3),
    ("Staff of Fireball", 1, 4),
    ("Scroll of Charm", 3, 2),
    ("Necklace of Intelligence", 1, 5),
    ("Ring of Invisibility", 1, 6);


-----------------------------POPULATING SKILLCHECKS TABLE-------------------

-- Version 1: Hard-coded FK values for difficulty class
INSERT INTO SkillChecks (
    description,
    roll_result,
    difficulty_id
)
VALUES
    ("Attempt to Cross Icy Bridge", 1, 4),
    ("Attempt to Initmidate Bronze Dragon", 20, 6),
    ("Attempt to Sneak Past Spectator", 5, 5);

-----------------------------POPULATING SKILLCHECKDETAILS-------------------------------------

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

---------------------------SAMPLE DATA SETS--------------------------------------------------------------------

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
        ---> Items.quantity = 1
-- SkillCheckDetails.skill_check_id = 1 
        ---> SkillChecks.difficulty_id = 4 -> "Difficult"
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
        ---> Items.quantity = 3
-- SkillCheckDetails.skill_check_id = 2 
        ---> SkillChecks.difficulty_id = 6 -> "Extreme"
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
        ---> Items.quantity = 1
-- SkillCheckDetails.skill_check_id = 3 
        ---> SkillChecks.difficulty_id = 5 -> "Very Difficult"
        ---> SkillChecks.description = ""Attempt to Sneak Past Spectator""

