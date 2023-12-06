-- PURPOSE: THIS FILE IS A COLLECTION OF THE SQL QUERIES USED BY CS 340 GROUP 33's PORTFOLIO PROJECT

-----------------------------CHARACTERS TABLE - SELECT-------------------
SELECT character_id, Characters.name AS Name, level AS Level, strength AS Strength, dexterity AS Dexterity, constitution AS Constitution, intelligence AS Intelligence, wisdom AS Wisdom, charisma AS Charisma, Races.name AS Race, Classes.name AS Class 
FROM Characters 
JOIN Races on Characters.Race_Id = Races.Race_Id 
JOIN Classes on Characters.Class_Id = Classes.Class_Id 
ORDER BY character_id ASC;

-----------------------------CHARACTERS TABLE - INSERT-------------------
INSERT INTO Characters (name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, race_id, class_id)
VALUES (:nameInput, :levelInput, :strengthInput, :dexterityInput, :constitutionInput, :intelligenceInput, :wisdomInput, :charismaInput, :raceIDInput, :classIDInput);

-----------------------------CHARACTERS TABLE - UPDATE-------------------
UPDATE Characters SET level = :inputLevel, strength = :strengthInput, dexterity = :dexterityInput, constitution = :constitutionInput, intelligence = :intelligenceInput, wisdom = :wisdomInput, charisma = :charismaInput,
     race_id = :raceIDInput, class_id = :classIDInput WHERE Characters.character_id = :characterID;

-----------------------------RACES TABLE - SELECT-------------------
SELECT * FROM Races ORDER BY race_id ASC;

-----------------------------RACES TABLE - INSERT-------------------
INSERT INTO Races (name, description) VALUES (:nameInput,:descriptionInput);

-----------------------------CLASSES TABLE - SELECT-------------------
SELECT * FROM Classes ORDER BY class_id ASC;

-----------------------------CLASSES TABLE - INSERT-------------------
INSERT INTO Classes (name, description) VALUES (:nameInput,:descriptionInput);

-----------------------------ACTIONS TABLE - SELECT-------------------
SELECT action_id, Actions.name AS Name FROM Actions ORDER BY action_id ASC;

-----------------------------ACTIONS TABLE - INSERT-------------------
INSERT INTO Actions (name) VALUES (:nameInput);

-----------------------------EVENT DIFFICULTIES TABLE - SELECT-------------------
SELECT difficulty_id, EventDifficulties.value AS "Value", EventDifficulties.description AS "Description" FROM EventDifficulties ORDER BY difficulty_id ASC;

-----------------------------EVENT DIFFICULTIES TABLE - INSERT-------------------
INSERT INTO EventDifficulties (value, description) VALUES (:valueInput,:descriptionInput);

-----------------------------SKILL CHECKS TABLE - SELECT-------------------
SELECT skill_check_id, SkillChecks.description AS Description, roll_result AS "Roll Result", EventDifficulties.description AS Difficulty, EventDifficulties.value AS "Difficulty Value"
FROM SkillChecks 
JOIN EventDifficulties ON SkillChecks.difficulty_id = EventDifficulties.difficulty_id 
ORDER BY skill_check_id ASC;

-----------------------------SKILL CHECKS TABLE - INSERT-------------------
INSERT INTO SkillChecks (description, roll_result, difficulty_id) VALUES (:descriptionInput, :rollResultInput, :difficultyID);

-----------------------------SKILL CHECKS TABLE - UPDATE-------------------
UPDATE SkillChecks SET roll_result = :roll_result_input, difficulty_id = :difficulty_id_input WHERE skill_check_id = :skill_check_id_input;

-----------------------------SKILL CHECKS TABLE - DELETE-------------------
DELETE FROM SkillChecks WHERE skill_check_id = :skill_check_id_input;

-----------------------------SKILL CHECK DETAILS TABLE - SELECT-------------------
SELECT skill_check_details_id, Actions.name AS "Action", Characters.name AS "Character", Items.name AS "Item", SkillChecks.description AS "Description"
FROM SkillCheckDetails 
JOIN Actions ON SkillCheckDetails.action_id = Actions.action_id 
JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id 
LEFT JOIN Items ON SkillCheckDetails.item_id = Items.item_id 
JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id 
ORDER BY skill_check_details_id ASC;

-----------------------------SKILL CHECK DETAILS TABLE - INSERT-------------------
INSERT INTO SkillCheckDetails (action_id, character_id, item_id, skill_check_id) VALUES (:action_id_input, :character_id_input, :item_id_input, :skill_check_id_input);


-----------------------------SKILL CHECK DETAILS TABLE - UPDATE-------------------
UPDATE SkillCheckDetails SET action_id = :action_id_input, character_id = :character_id_input, item_id = :item_id_input, skill_check_id = :skill_check_id_input WHERE skill_check_details_id = :skill_check_details_id_input;

-----------------------------SKILL CHECK DETAILS TABLE - DELETE-------------------
DELETE FROM SkillCheckDetails WhERE skill_check_details_id = :skillCheckDetailsIDInput;

-----------------------------ITEMS TABLE - SELECT-------------------
SELECT item_id, Items.name AS Name, quantity as Quantity, ItemTypes.name As "Item Type"
FROM Items 
JOIN ItemTypes ON Items.item_type_id = ItemTypes.item_type_id 
ORDER BY item_id ASC;

-----------------------------ITEMS TABLE - INSERT-------------------
INSERT INTO Items (name, quantity, item_type_id) VALUES (:nameInput, :quantityInput, :itemTypeIDInput);

-----------------------------ITEMS TABLE - UPDATE-------------------
UPDATE Items SET quantity = :quantityInput, item_type_id = :itemTypeIDInput WHERE Items.item_id = :itemIDInput;

-----------------------------ITEM TYPES TABLE - SELECT-------------------
SELECT item_type_id, ItemTypes.name AS Name FROM ItemTypes ORDER BY item_type_id ASC;

-----------------------------ITEM TYPES TABLE - INSERT-------------------
INSERT INTO ItemTypes (name) VALUES (:nameInput);