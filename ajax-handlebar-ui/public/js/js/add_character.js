let addCharacterForm = document.getElementById('add-character-form');

addCharacterForm.addEventListener("submit", function(e){
    e.preventDefault();
    let inputName = document.getElementById("input-name");
    let inputLevel = document.getElementById("input-lvl");
    let inputStr = document.getElementById("input-str");
    let inputDex = document.getElementById("input-dex");
    let inputCon = document.getElementById("input-con");
    let inputInt = document.getElementById("input-int");
    let inputWis = document.getElementById("input-wis");
    let inputChr = document.getElementById("input-chr");
    let inputRaceID = document.getElementById("input-race");
    let inputClassID = document.getElementById("input-class");

    let inputNameValue = inputName.value;
    let inputLevelValue = inputLevel.value;
    let inputStrValue = inputStr.value;
    let inputDexValue = inputDex.value;
    let inputConValue = inputCon.value;
    let inputIntValue = inputInt.value;
    let inputWisValue = inputWis.value;
    let inputChrValue = inputChr.value;
    let inputRaceIDValue = inputRaceID.value;
    let inputClassIDValue = inputClassID.value;

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

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-character", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputName.value = '';
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
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('characters-table');
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let levelCell = document.createElement("TD");
    let strCell = document.createElement("TD");
    let dexCell = document.createElement("TD");
    let conCell = document.createElement("TD");
    let intCell = document.createElement("TD");
    let wisCell = document.createElement("TD");
    let chrCell = document.createElement("TD");
    let raceidCell = document.createElement("TD");
    let classidCell = document.createElement("TD");

    idCell.innerText = newRow.character_id;
    nameCell.innerText = newRow.name;
    levelCell.innerText = newRow.level;
    strCell.innerText = newRow.strength;
    dexCell.innerText = newRow.dexterity;
    conCell.innerText = newRow.constitution;
    intCell.innerText = newRow.intelligence;
    wisCell.innerText = newRow.wisdom;
    chrCell.innerText = newRow.charisma;
    raceidCell.innerText = newRow.race_id;
    classidCell.innerText = newRow.class_id;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(levelCell);
    row.appendChild(strCell);
    row.appendChild(dexCell);
    row.appendChild(conCell);
    row.appendChild(intCell);
    row.appendChild(wisCell);
    row.appendChild(chrCell);
    row.appendChild(raceidCell);
    row.appendChild(classidCell);

    row.setAttribute("data-value", newRow.character_id)

    currentTable.appendChild(row);

    let selectMenu = document.getElementById("selected-character");
    let selectOption = document.createElement("option");
    selectOption.text = newRow.name;
    selectOption.value = newRow.character_id;
    selectMenu.add(selectOption);

}
