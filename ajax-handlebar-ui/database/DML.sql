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

-----------------------------CLASSES TABLE - SELECT-------------------
SELECT * FROM Classes ORDER BY class_id ASC;

-----------------------------ACTIONS TABLE - SELECT-------------------
SELECT action_id, Actions.name AS Name FROM Actions ORDER BY action_id ASC;

-----------------------------ACTIONS TABLE - INSERT-------------------
INSERT INTO Actions (name) VALUES (:nameInput);

-----------------------------SKILL CHECKS TABLE - SELECT-------------------
SELECT skill_check_id, SkillChecks.description AS Description, roll_result AS "Roll Result", EventDifficulties.description AS Difficulty, EventDifficulties.value AS "Difficulty Value"
FROM SkillChecks 
JOIN EventDifficulties ON SkillChecks.difficulty_id = EventDifficulties.difficulty_id 
ORDER BY skill_check_id ASC;

-----------------------------SKILL CHECKS TABLE - INSERT-------------------
INSERT INTO SkillChecks (description, roll_result, difficulty_id) VALUES (:descriptionInput, :rollResultInput, :difficultyID);

-----------------------------SKILL CHECK DETAILS TABLE - SELECT-------------------
SELECT skill_check_details_id, Actions.name AS "Action", Characters.name AS "Character", Items.name AS "Item", SkillChecks.description AS "Description"
FROM SkillCheckDetails 
JOIN Actions ON SkillCheckDetails.action_id = Actions.action_id 
JOIN Characters ON SkillCheckDetails.character_id = Characters.character_id 
JOIN Items ON SkillCheckDetails.item_id = Items.item_id 
JOIN SkillChecks ON SkillCheckDetails.skill_check_id = SkillChecks.skill_check_id 
ORDER BY skill_check_details_id ASC;

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