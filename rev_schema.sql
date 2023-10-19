
-------------------------------------CREATE TABLES--------------------------------------


CREATE OR REPLACE TABLE Races (
    race_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text,
    PRIMARY KEY (race_id),
    CONSTRAINT race_name UNIQUE (race_id,name)
);

CREATE OR REPLACE TABLE Classes (
    class_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text,
    PRIMARY KEY (class_id),
    CONSTRAINT class_name UNIQUE (class_id,name)
);

CREATE OR REPLACE TABLE ItemTypes (
    item_type_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (item_type_id),
    CONSTRAINT item_type UNIQUE (item_type_id, name)
);

CREATE OR REPLACE TABLE Actions (
    action_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (action_id),
    CONSTRAINT action_name UNIQUE (action_id, name)
);

CREATE OR REPLACE TABLE DifficultyClasses (
    difficulty_class_id int NOT NULL AUTO_INCREMENT,
    value int NOT NULL,
    description text,
    PRIMARY KEY (difficulty_class_id),
    CONSTRAINT difficulty_type UNIQUE (difficulty_class_id, value)
);

CREATE OR REPLACE TABLE Items (
    item_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    item_type_id int,
    PRIMARY KEY (item_id, item_type_id),  -- composite key 
    FOREIGN KEY (item_type_id) REFERENCES ItemTypes(item_type_id),
    CONSTRAINT item_identity UNIQUE (name, item_type_id)
);

CREATE OR REPLACE TABLE Characters (
    character_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    level int NOT NULL DEFAULT 1,
    strength int NOT NULL DEFAULT 10,
    dexterity int NOT NULL DEFAULT 10,
    constitution int NOT NULL DEFAULT 10,
    intelligence int NOT NULL DEFAULT 10,
    wisdom int NOT NULL DEFAULT 10,
    charisma int NOT NULL DEFAULT 10,
    race_id int NOT NULL,
    class_id int NOT NULL,
    PRIMARY KEY (character_id),
    FOREIGN KEY (race_id) REFERENCES Races (race_id),
    FOREIGN KEY (class_id) REFERENCES Classes (class_id),
    CONSTRAINT character_identity UNIQUE (name, character_id)
);

CREATE OR REPLACE TABLE SkillChecks (
    skill_check_id int NOT NULL AUTO_INCREMENT,
    description text,
    roll_result int NOT NULL,
    difficulty_class_id int,
    PRIMARY KEY (skill_check_id, difficulty_class_id),
    FOREIGN KEY (difficulty_class_id) REFERENCES DifficultyClasses (difficulty_class_id)
);

CREATE OR REPLACE TABLE SkillCheckDetails (
    skill_check_details_id int NOT NULL AUTO_INCREMENT,
    action_id int,
    character_id int,
    item_id int,
    skill_check_id int,
    skill_check_success tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (skill_check_details_id), -- composite key or not?
    FOREIGN KEY (action_id) REFERENCES Actions (action_id),
    FOREIGN KEY (character_id) REFERENCES Characters (character_id),
    FOREIGN KEY (item_id) REFERENCES Items (item_id),
    FOREIGN KEY (skill_check_id) REFERENCES SkillChecks (skill_check_id)
);

--------------------------INSERT SAMPLE VALUES--------------------------------------
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

INSERT INTO Characters (
    name,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    race_id, -- duplicate values to either find a way to place in CharacterDetails or Remove
    class_id
)
VALUES
    ("beginner", 2, 10, 11, 12, 15, 17, 10, 2, 1);
    -- ("intermediate", 5, 12, 13, 12, 11, 9, 14, "Tiefling", "Warlock"),
    -- ("expert", 10, 10, 17, 14, 9, 16, 10, "Half-Elf", "Monk");

-- INSERT INTO CharacterDetails (
--     character_id,
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

INSERT INTO Items (
    name,
    item_type_id
)
VALUES 
    (
        "Elixer of Cloud Giant",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Potion")
    ),
    (
        "Boots of Speed",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Armor")
    ),
    (
        "Staff of Fireball",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Weapon")
    ),
    (
        "Scroll of Charm Humanoid",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Scroll")
    ),
    (
        "Necklace of Intelligence",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Amulet")
    ),
    (
        "Ring of Invisibility",
        (SELECT item_type_id FROM ItemTypes WHERE ItemTypes.name = "Ring")
    );

    
--- TEST QUERY FOR ITEMS AND ITEMTYPES RELATION ---------------------------------------------
SELECT Items.name AS "Item name", ItemTypes.name AS "Item Type" 
FROM Items INNER JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id;

--- TEST CODE TO SHOW UTILITY OF USING CHARACTER DETAILS TABLE-------------------------------
SELECT Characters.name AS "Character Name", Characters.strength, Characters.wisdom, Races.name AS "Race",
Classes.name AS "Class" 
FROM ((Characters 
INNER JOIN Races ON Characters.race_id = Races.race_id)
INNER JOIN Classes ON Characters.class_id = Classes.class_id);