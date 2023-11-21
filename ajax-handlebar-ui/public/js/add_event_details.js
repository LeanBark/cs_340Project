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

    let editCellButton = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "/img/edit-icon.svg";
    editIcon.width= 39;
    editIcon.height = 30;
    editCellButton.append(editIcon);
    editCellButton.onclick = function(){
        updateEventDetails(newRow.skill_check_details_id);
    };

    editCell.appendChild(editCellButton)

    let deleteCellButton = document.createElement("button");
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "img/delete-icon.svg";
    deleteIcon.width = 39;
    deleteIcon.height = 30;
    deleteCellButton.append(deleteIcon);
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