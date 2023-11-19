// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// race selector
// class selector
// event listener for prefilling form data -- in progress

function updateCharacter(character_id) {
    let table = document.getElementById("characters-table");
    
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
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
            let editInd = updateRowIndex.getElementsByTagName("td")[11];

            let inputCharacterName = document.getElementById("selected-character");
            for (i=0; i < inputCharacterName.length; i++){
                let option = inputCharacterName.options[i];
                if (option.value == character_id){
                    inputCharacterName.value = option.value;
                    inputCharacterName.text = option.text;
                }
            }

            let inputLevel = document.getElementById("input-lvl-update");
            inputLevel.value = levelInd.innerHTML;

            levelInd.innerHTML = "";
            levelInd.appendChild(inputLevel);


            let inputStr = document.getElementById("input-str-update");
            inputStr.value = strInd.innerHTML;

            strInd.innerHTML = "";
            strInd.appendChild(inputStr);

            let inputDex = document.getElementById("input-dex-update");
            inputDex.value = dexInd.innerHTML;

            dexInd.innerHTML = "";
            dexInd.appendChild(inputDex);

            let inputCon = document.getElementById("input-con-update");
            inputCon.value = conInd.innerHTML;

            conInd.innerHTML = "";
            conInd.appendChild(inputCon);


            let inputInt = document.getElementById("input-int-update");
            inputInt.value = intInd.innerHTML;

            intInd.innerHTML = "";
            intInd.appendChild(inputInt);


            let inputWis = document.getElementById("input-wis-update");
            inputWis.value = wisInd.innerHTML;

            wisInd.innerHTML = "";
            wisInd.appendChild(inputWis);


            let inputChr = document.getElementById("input-chr-update");
            inputChr.value = chrInd.innerHTML;

            chrInd.innerHTML = "";
            chrInd.appendChild(inputChr);
            
            
            let inputRaceID = document.getElementById("input-race-update");
            for(let i=0; i<inputRaceID.length; i++){
                
                let option = inputRaceID.options[i];
                if (option.text == raceInd.innerText){
                    inputRaceID.value = option.value;
                    inputRaceID.text = option.text;
                }
            }



            raceInd.innerHTML = "";
            raceInd.appendChild(inputRaceID);

            let inputClassID = document.getElementById("input-class-update");
            for(let i=0; i<inputClassID.length; i++){
                let option = inputClassID.options[i];
                if (option.text == classInd.innerText){
                    inputClassID.value = option.value;
                    inputClassID.text = option.text;
                }
            }

            classInd.innerHTML = "";
            classInd.appendChild(inputClassID);


            
            let submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.onclick = function(e){
                submitCharacter(character_id);
            };

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);

        }
    }
}


function submitCharacter(character_id){
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

    for (let i = 0; i<inputCharacterName.length; i++){
        let option = inputCharacterName.options[i];
        if (option.value == character_id){
            inputCharacterName.value = option.value;
            inputCharacterName.text = option.text;
        }
    }

    let inputNameValue = inputCharacterName.value;
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
}

//--------------------Function is passed response data and Updates Input Values of selected character by their character_id---------------------//
function updateRow(data, character_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("characters-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
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
            let editInd = updateRowIndex.getElementsByTagName("td")[11];

            let hiddenForm = document.getElementById("update-character-form");

            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.onclick = function(e){
                updateCharacter(character_id);
            };


            hiddenForm.appendChild(levelInd.removeChild(levelInd.children[0]));
            levelInd.innerHTML = parsedData[0].level;

            hiddenForm.appendChild(strInd.removeChild(strInd.children[0]));
            strInd.innerHTML= parsedData[0].strength;

            hiddenForm.appendChild(dexInd.removeChild(dexInd.children[0]));
            dexInd.innerHTML = parsedData[0].dexterity;

            hiddenForm.appendChild(conInd.removeChild(conInd.children[0]));
            conInd.innerHTML = parsedData[0].constitution;

            hiddenForm.appendChild(intInd.removeChild(intInd.children[0]));
            intInd.innerHTML = parsedData[0].intelligence;

            hiddenForm.appendChild(wisInd.removeChild(wisInd.children[0]));
            wisInd.innerHTML = parsedData[0].wisdom;

            hiddenForm.appendChild(chrInd.removeChild(chrInd.children[0]));
            chrInd.innerHTML = parsedData[0].charisma;

            hiddenForm.appendChild(raceInd.removeChild(raceInd.children[0]));
            raceInd.innerHTML = parsedData[0].race;
            

            hiddenForm.appendChild(classInd.removeChild(classInd.children[0]));
            classInd.innerHTML = parsedData[0].class;


            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(editButton);
        
        }
    }
}
