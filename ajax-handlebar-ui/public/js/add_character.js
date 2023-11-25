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


let addCharacterForm = document.getElementById('add-character-form');

addCharacterForm.addEventListener("submit", function(e){
    e.preventDefault();

    let data = {
        name: document.getElementById("input-name").value,
        level: document.getElementById("input-lvl").value,
        strength: document.getElementById("input-str").value,
        dexterity: document.getElementById("input-dex").value,
        constitution: document.getElementById("input-con").value,
        intelligence: document.getElementById("input-int").value,
        wisdom: document.getElementById("input-wis").value,
        charisma: document.getElementById("input-chr").value,
        race_id: document.getElementById("input-race").value,
        class_id: document.getElementById("input-class").value
    }

    // Ajax Request/Response for adding new characters
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-character", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            document.getElementById("input-name").value = '';
            document.getElementById("input-lvl").value = '';
            document.getElementById("input-str").value = '';
            document.getElementById("input-dex").value = '';
            document.getElementById("input-con").value = '';
            document.getElementById("input-int").value = '';
            document.getElementById("input-wis").value = '';
            document.getElementById("input-chr").value = '';
            document.getElementById("input-race").value = '';
            document.getElementById("input-class").value = '';
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
    
    // add new row for added character to next open index at end of array
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
    let editCell = document.createElement("TD");

    // populate table cells of new row with parsed data values
    idCell.innerText = newRow.character_id;
    row.appendChild(idCell);
    nameCell.innerText = newRow.name;
    row.appendChild(nameCell);
    levelCell.innerText = newRow.level;
    row.appendChild(levelCell);
    strCell.innerText = newRow.strength;
    row.appendChild(strCell);
    dexCell.innerText = newRow.dexterity;
    row.appendChild(dexCell);
    conCell.innerText = newRow.constitution;
    row.appendChild(conCell);
    intCell.innerText = newRow.intelligence;
    row.appendChild(intCell);
    wisCell.innerText = newRow.wisdom;
    row.appendChild(wisCell);
    chrCell.innerText = newRow.charisma;
    row.appendChild(chrCell);
    raceidCell.innerText = newRow.race_id;
    row.appendChild(raceidCell);
    classidCell.innerText = newRow.class_id;
    row.appendChild(classidCell);

    let editCellButton = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "/img/edit-icon.svg";
    editIcon.width= 39;
    editIcon.height = 30;
    editCellButton.append(editIcon);
    editCellButton.onclick = function(){
        updateCharacter(newRow.character_id);
    }
    editCell.append(editCellButton);
    row.appendChild(editCell);

    row.setAttribute("data-value", newRow.character_id)

    currentTable.appendChild(row);

}
