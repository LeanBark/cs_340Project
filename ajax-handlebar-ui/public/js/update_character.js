// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateCharacterForm = document.getElementById("update-character-form");


//------------Clicking submit button in edit character infromation form retrieves the input data for updating character----//
updateCharacterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputCharacterName = document.getElementById("selected-character");
    let inputLevel = document.getElementById("input-lvl-update");
    let inputStr = document.getElementById("input-str-update");
    let inputDex = document.getElementById("input-dex-update");
    let inputCon = document.getElementById("input-con-update");
    let inputInt = document.getElementById("input-int-update");
    let inputWis = document.getElementById("input-wis-update");
    let inputChr = document.getElementById("input-chr-update");
    let inputRaceID = document.getElementById("input-race-update");
    let inputClassID = document.getElementById("input-class-update");

    let inputNameValue = inputCharacterName.value;
    let inputLevelValue = inputLevel.value;
    let inputStrValue = inputStr.value;
    let inputDexValue = inputDex.value;
    let inputConValue = inputCon.value;
    let inputIntValue = inputInt.value;
    let inputWisValue = inputWis.value;
    let inputChrValue = inputChr.value;
    let inputRaceIDValue = inputRaceID.value;
    let inputClassIDValue = inputClassID.value;

    //---- Organizes data according to their respective values to send as response to ajax request according to selected character name---//
    let data = {
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

//---------------Places AJAX Request------------------------------//
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-character", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, inputNameValue);
            inputCharacterName.value = '';
            inputLevel.value = '';
            inputStr.value = '';
            inputDex.value = '';
            inputCon.value = '';
            inputInt.value = '';
            inputWis.value = '';
            inputChr.value = '';
            inputRaceID.value = '';
            inputClassID.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
})

//--------------------Function is passed response data and Updates Input Values of selected character by their character_id---------------------//
function updateRow(data, characterID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("characters-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == characterID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let levelInd = updateRowIndex.getElementsByTagName("td")[2];
            let strInd = updateRowIndex.getElementsByTagName("td")[3];
            let dexInd = updateRowIndex.getElementsByTagName("td")[4];
            let conInd = updateRowIndex.getElementsByTagName("td")[5];
            let intInd = updateRowIndex.getElementsByTagName("td")[6];
            let wisInd = updateRowIndex.getElementsByTagName("td")[7];
            let chrInd = updateRowIndex.getElementsByTagName("td")[8];
            let raceInd = updateRowIndex.getElementsByTagName("td")[9];
            let classInd = updateRowIndex.getElementsByTagName("td")[10];
            levelInd.innerHTML = parsedData[0].level;
            strInd.innerHTML = parsedData[0].strength;  // HTML for parsed data instead of text
            dexInd.innerHTML = parsedData[0].dexterity;
            conInd.innerHTML = parsedData[0].constitution;
            intInd.innerHTML = parsedData[0].intelligence;
            wisInd.innerHTML = parsedData[0].wisdom;
            chrInd.innerHTML = parsedData[0].charisma;
            raceInd.innerHTML = parsedData[0].race;
            classInd.innerHTML = parsedData[0].class;
        }
        
    }
}