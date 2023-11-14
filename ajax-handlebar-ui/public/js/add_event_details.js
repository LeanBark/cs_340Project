// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addEventForm = document.getElementById('add-event-details-form');

addEventForm.addEventListener("submit", function(e){
    e.preventDefault();
    let inputAction = document.getElementById("input-action");
    let inputCharacter = document.getElementById("input-character");
    let inputItem = document.getElementById("input-item");
    let inputSkillCheck = document.getElementById("input-skill-check");

    let inputActionValue = inputAction.value;
    let inputCharacterValue = inputCharacter.value;
    let inputItemValue = inputItem.value;
    let inputSkillCheckValue = inputSkillCheck.value;

    let data = {
        action_id: inputActionValue,
        character_id: inputCharacterValue,
        item_id: inputItemValue,
        skill_check_id: inputSkillCheckValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event-details", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputAction.value = '';
            inputCharacter.value = '';
            inputItem.value = '';
            inputSkillCheck.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('event-details-table');
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");

    let idCell = document.createElement("TD");
    let actionCell = document.createElement("TD");
    let characterCell = document.createElement("TD");
    let itemCell = document.createElement("TD");
    let skillCheckCell = document.createElement("TD");
    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    idCell.innerText = newRow.skill_check_details_id;
    actionCell.innerText = newRow.Action;
    characterCell.innerText = newRow.Character;
    itemCell.innerText = newRow.Item;
    skillCheckCell.innerText = newRow.Description;

    editCellButton = document.createElement("button");
    editCellButton.innerText = "Edit";
    editCellButton.onclick = function(){
        updateEventDetails(newRow.skill_check_details_id);
    };

    editCell.appendChild(editCellButton)

    deleteCellButton = document.createElement("button");
    deleteCellButton.innerText = "Delete";
    deleteCellButton.onclick = function(){
        deleteEventDetails(newRow.skill_check_details_id);
    };

    deleteCell.appendChild(deleteCellButton);

    row.appendChild(idCell);
    row.appendChild(actionCell);
    row.appendChild(characterCell);
    row.appendChild(itemCell);
    row.appendChild(skillCheckCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute("data-value", newRow.skill_check_details_id);

    currentTable.appendChild(row);
}