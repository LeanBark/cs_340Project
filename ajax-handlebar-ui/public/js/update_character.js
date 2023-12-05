// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//Citation for Icons:
//Date: 11/20/2023
// Icons for Submit, Delete, and Edit buttons were provided from svgrepo.com
// Source URL for Edit Icons: https://www.svgrepo.com/svg/511904/edit-1479
//Source URL for Submit Icons:https://www.svgrepo.com/svg/494419/submit-success-check-mark
//Soruce Url for Delete Icons: https://www.svgrepo.com/svg/499905/delete

//Function updates submitted form data displayed in characters table
function updateCharacter(character_id) {
    let table = document.getElementById("characters-table");

    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let nameInd = updateRowIndex.getElementsByTagName("td")[1];
            let levelInd = updateRowIndex.getElementsByTagName("td")[2];
            let strengthInd = updateRowIndex.getElementsByTagName("td")[3];
            let dexterityInd = updateRowIndex.getElementsByTagName("td")[4];
            let constitutionInd = updateRowIndex.getElementsByTagName("td")[5];
            let intelligenceInd = updateRowIndex.getElementsByTagName("td")[6];
            let wisdomInd = updateRowIndex.getElementsByTagName("td")[7];
            let charismaInd = updateRowIndex.getElementsByTagName("td")[8];
            let raceInd = updateRowIndex.getElementsByTagName("td")[9];
            let classInd = updateRowIndex.getElementsByTagName("td")[10];
            let editInd = updateRowIndex.getElementsByTagName("td")[11];

            let nameInput = document.getElementById("input-name-update");
            nameInput.value = nameInd.innerHTML;
            nameInd.innerHTML = "";
            nameInd.appendChild(nameInput);

            let levelInput = document.getElementById("input-lvl-update");
            levelInput.value = levelInd.innerHTML;
            levelInd.innerHTML = "";
            levelInd.appendChild(levelInput);

            let strengthInput = document.getElementById("input-str-update");
            strengthInput.value = strengthInd.innerHTML;
            strengthInd.innerHTML = "";
            strengthInd.appendChild(strengthInput);

            let dexterityInput = document.getElementById("input-dex-update");
            dexterityInput.value = dexterityInd.innerHTML;
            dexterityInd.innerHTML = "";
            dexterityInd.appendChild(dexterityInput);

            let constitutionInput = document.getElementById("input-con-update");
            constitutionInput.value = constitutionInd.innerHTML;
            constitutionInd.innerHTML = "";
            constitutionInd.appendChild(constitutionInput);

            let intelligenceInput = document.getElementById("input-int-update");
            intelligenceInput.value = intelligenceInd.innerHTML;
            intelligenceInd.innerHTML = "";
            intelligenceInd.appendChild(intelligenceInput);

            let wisdomInput = document.getElementById("input-wis-update");
            wisdomInput.value = wisdomInd.innerHTML;
            wisdomInd.innerHTML = "";
            wisdomInd.appendChild(wisdomInput);

            let charismaInput = document.getElementById("input-chr-update");
            charismaInput.value = charismaInd.innerHTML;
            charismaInd.innerHTML = "";
            charismaInd.appendChild(charismaInput);

            let raceOptions = document.getElementById("input-race-update");
            for (let i = 0; i < raceOptions.length; i++){
                let option = raceOptions.options[i];
                if (option.text == raceInd.innerHTML){
                    raceOptions.value = option.value;
                    raceOptions.text = option.text;
                }
            }

            raceInd.innerHTML = "";
            raceInd.appendChild(raceOptions);

            let classOptions = document.getElementById("input-class-update");
            for (let i = 0; i < classOptions.length; i++){
                let option = classOptions.options[i];
                if (option.text == classInd.innerHTML){
                    classOptions.value = option.value;
                    classOptions.text = option.text;
                }
            }

            classInd.innerHTML = "";
            classInd.appendChild(classOptions);

            let submitButton = document.createElement("button");
            let submitIcon = document.createElement("img");
            submitIcon.src = "/img/submit-icon.svg";
            submitIcon.width= 39;
            submitIcon.height = 30;
            submitButton.append(submitIcon);
            submitButton.onclick = function(){
                submitCharacter(character_id);
            }

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);

        }
    }
}

//Clicking submit button in edit character information form retrieves the input data for updating character
function submitCharacter(character_id) {
    let inputName = document.getElementById("input-name-update");
    let inputLevel = document.getElementById("input-lvl-update");
    let inputStr = document.getElementById("input-str-update");
    let inputDex = document.getElementById("input-dex-update");
    let inputCon = document.getElementById("input-con-update");
    let inputInt = document.getElementById("input-int-update");
    let inputWis = document.getElementById("input-wis-update");
    let inputChr = document.getElementById("input-chr-update");
    let inputRaceID = document.getElementById("input-race-update");
    let inputClassID = document.getElementById("input-class-update");

    let inputId = character_id.toString();
    let inputNameValue = inputName.value;
    let inputLevelValue = inputLevel.value;
    let inputStrValue = inputStr.value;
    let inputDexValue = inputDex.value;
    let inputConValue = inputCon.value;
    let inputIntValue = inputInt.value;
    let inputWisValue = inputWis.value;
    let inputChrValue = inputChr.value;


    for (let i = 0; i<inputRaceID.length; i++){
        let option = inputRaceID.options[i];
        if (option.text == inputRaceID.innerText){
            console.log(option.text);
            inputRaceID.value = option.value;
            inputRaceID.text = option.text;
        }
    }
    let inputRaceIDValue = inputRaceID.value;

    for (let i = 0; i<inputClassID.length; i++){
        let option = inputClassID.options[i];
        if (option.text == inputClassID.innerText){
            inputClassID.value = option.value;
            inputClassID.text = option.text;
        }
    }
    let inputClassIDValue = inputClassID.value;
    
    // Organizes data according to their respective values to send as response to ajax request according to selected character name
    let data = {
        id: inputId,
        name: inputNameValue,
        level: inputLevelValue,
        strength: inputStrValue,
        dexterity: inputDexValue,
        constitution: inputConValue,
        intelligence: inputIntValue,
        wisdom: inputWisValue,
        charisma: inputChrValue,
        race_id: inputRaceIDValue,
        class_id: inputClassIDValue
    }    


// Places AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-character", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, character_id);
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
}

// Function is passed response data and Updates Input Values of selected character by their character_id
function updateRow(data, character_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("characters-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let nameInd = updateRowIndex.getElementsByTagName("td")[1]
            let levelInd = updateRowIndex.getElementsByTagName("td")[2];
            let strengthInd = updateRowIndex.getElementsByTagName("td")[3];
            let dexterityInd = updateRowIndex.getElementsByTagName("td")[4];
            let constitutionInd = updateRowIndex.getElementsByTagName("td")[5];
            let intelligenceInd = updateRowIndex.getElementsByTagName("td")[6];
            let wisdomInd = updateRowIndex.getElementsByTagName("td")[7];
            let charismaInd = updateRowIndex.getElementsByTagName("td")[8];
            let raceInd = updateRowIndex.getElementsByTagName("td")[9];
            let classInd = updateRowIndex.getElementsByTagName("td")[10];
            let editInd = updateRowIndex.getElementsByTagName("td")[11];
            
            let hiddenForm = document.getElementById("update-character-form");

            let editButton = document.createElement("button");
            let editIcon = document.createElement("img");
            editIcon.src = "/img/edit-icon.svg";
            editIcon.width= 39;
            editIcon.height = 30;
            editButton.append(editIcon);
            editButton.onclick = function(e){
                // let currentTable = doscument.getElementById("characters-table");
                // for (let i=0, row; row = currentTable.rows[i]; i++){
                //     if(currentTable.rows[i].getAttribute("data-value") != character_id){
                //         // hide or disable edit button for unrelated rows
                //     }
                // }
                updateCharacter(character_id);
            }
            // hidden update form is appended to HTML table and displayed to user when edit button is clicked
            hiddenForm.appendChild(nameInd.removeChild(nameInd.children[0]));
            nameInd.innerHTML = parsedData[0].name;

            hiddenForm.appendChild(levelInd.removeChild(levelInd.children[0]));
            levelInd.innerHTML = parsedData[0].level;

            hiddenForm.appendChild(strengthInd.removeChild(strengthInd.children[0]));
            strengthInd.innerHTML = parsedData[0].strength;  // HTML for parsed data instead of text
            
            hiddenForm.appendChild(dexterityInd.removeChild(dexterityInd.children[0]));
            dexterityInd.innerHTML = parsedData[0].dexterity;
            
            hiddenForm.appendChild(constitutionInd.removeChild(constitutionInd.children[0]));
            constitutionInd.innerHTML = parsedData[0].constitution;

            hiddenForm.appendChild(intelligenceInd.removeChild(intelligenceInd.children[0]));
            intelligenceInd.innerHTML = parsedData[0].intelligence;

            hiddenForm.appendChild(wisdomInd.removeChild(wisdomInd.children[0]));
            wisdomInd.innerHTML = parsedData[0].wisdom;

            hiddenForm.appendChild(charismaInd.removeChild(charismaInd.children[0]));
            charismaInd.innerHTML = parsedData[0].charisma;

            hiddenForm.appendChild(raceInd.removeChild(raceInd.children[0]));
            raceInd.innerHTML = parsedData[0].race;

            hiddenForm.appendChild(classInd.removeChild(classInd.children[0]));
            classInd.innerHTML = parsedData[0].class;

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(editButton);
        }
        
        }
    }


