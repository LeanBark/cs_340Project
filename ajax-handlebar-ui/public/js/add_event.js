// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addEventForm = document.getElementById('add-event-form');

addEventForm.addEventListener("submit", function(e){
    e.preventDefault();
    let inputDesc = document.getElementById("input-description");
    let inputRoll = document.getElementById("input-roll-value");
    let inputDiff = document.getElementById("input-difficulty");

    let inputDescValue = inputDesc.value;
    let inputRollValue = inputRoll.value;
    let inputDiffValue = inputDiff.value;


    let data = {
        description: inputDescValue,
        roll_result: inputRollValue,
        difficulty_id: inputDiffValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputDesc.value = '';
            inputRoll.value = '';
            inputDiff.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('events-table');
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let rollCell = document.createElement("TD");
    let difficultyCell = document.createElement("TD");
    let difficultyValueCell = document.createElement("TD");
    let deleteCell = document.createElement("td");

    idCell.innerText = newRow.skill_check_id;
    descriptionCell.innerText = newRow.description;
    rollCell.innerText = newRow.roll_result;
    difficultyCell.innerText = newRow.difficulty;
    difficultyValueCell.innerText = newRow.value;

    let deleteCellButton = document.createElement("button");
    deleteCellButton.innerText = "Delete";
    deleteCellButton.onclick = function(){
        deleteEvent(newRow.skill_check_id);
    };

    deleteCell.appendChild(deleteCellButton);    

    row.appendChild(idCell);
    row.appendChild(descriptionCell);
    row.appendChild(rollCell);
    row.appendChild(difficultyCell);
    row.appendChild(difficultyValueCell);
    row.appendChild(deleteCell);

    row.setAttribute("data-value", newRow.skill_check_id);

    currentTable.appendChild(row);

    addDropDownMenu(newRow.skill_check_id, newRow.description);
}

function addDropDownMenu(skill_check_id, description){
    
    let selectMenu = document.getElementById("selected-event");
    let newOption = document.createElement("option")

    newOption.innerText = description
    newOption.value = skill_check_id

    selectMenu.appendChild(newOption)
}