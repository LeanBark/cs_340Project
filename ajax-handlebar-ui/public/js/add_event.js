// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//Citation for Icons:
//Date: 11/20/2023
// Icons for Submit, Delete, and Edit buttons were provided from svgrepo.com
// Source URL for Edit Icons: https://www.svgrepo.com/svg/511904/edit-1479
// Source URL for Submit Icons:https://www.svgrepo.com/svg/494419/submit-success-check-mark
// Source Url for Delete Icons: https://www.svgrepo.com/svg/499905/delete

//Citation for GIFs
//Date: 11/21/2023
// GIFs for Critical Success and Critical Failure
//Source URL for Critical Success GIF: https://giphy.com/gifs/hyperrpg-dnd-roguelike-rogue-like-8cGXy3fskyacePqILB
//Source URL for Critical Failure GIF: https://giphy.com/gifs/dnd-d20-zxyllia-oOBTO2UcSoaBJewZT0



let addEventForm = document.getElementById('add-event-form');

// toggles whether add form is displayed to user
function displayForm (){
    let eventsForm = document.getElementById("add-event-form");
    if (eventsForm.style.display == "none"){
        eventsForm.style.display = "block";
    } else{
     eventsForm.style.display = "none";
    }
}
displayForm();

// submits input information for adding to database table
addEventForm.addEventListener("submit", function(e){
    e.preventDefault();
    let inputDesc = document.getElementById("input-description");
    let inputRoll = document.getElementById("input-roll-value");
    let inputDiff = document.getElementById("input-difficulty");

    let inputDescValue = inputDesc.value;
    let inputRollValue = inputRoll.value;
    let inputDiffValue = inputDiff.value;

    //easter-egg event showing GIFs
    let parentDiv = document.getElementById("skill-check-title");
    if (inputRollValue == 1) {
        let failGIF = document.createElement("iframe");
        failGIF.src="https://giphy.com/embed/oOBTO2UcSoaBJewZT0";
        failGIF.title="Critical Failure"
        failGIF.width="480";
        failGIF.height="480";
        failGIF.seamless=true;
        failGIF.style.display="block";
        parentDiv.appendChild(failGIF);
        setTimeout(function () {
            parentDiv.removeChild(failGIF);}, 4500)
    } else if (inputRollValue == 20){
        let successGIF = document.createElement("iframe");
        successGIF.src="https://giphy.com/embed/8cGXy3fskyacePqILB";
        successGIF.title="Critical Success";
        successGIF.width="480";
        successGIF.height="480";
        successGIF.seamless=true;
        successGIF.style.display="block";
        parentDiv.appendChild(successGIF);
        setTimeout(function (){
            parentDiv.removeChild(successGIF);}, 4500)
    }


    let data = {
        description: inputDescValue,
        roll_result: inputRollValue,
        difficulty_id: inputDiffValue
    }

    // Ajax Request/Response for Adding skill check events
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

// create new row for new skill check event to be added
addRowToTable = (data) => {
    let currentTable = document.getElementById('events-table');
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let descriptionCell = document.createElement("td");
    let rollCell = document.createElement("td");
    let difficultyCell = document.createElement("td");
    let difficultyValueCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    idCell.innerText = newRow.skill_check_id;
    descriptionCell.innerText = newRow.description;
    rollCell.innerText = newRow.roll_result;
    difficultyCell.innerText = newRow.difficulty;
    difficultyValueCell.innerText = newRow.value;

    // Adds edit button to new row with icon
    let editCellButton = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "/img/edit-icon.svg";
    editIcon.width= 39;
    editIcon.height = 30;
    editCellButton.append(editIcon);
    editCellButton.onclick = function(){
        updateEvent(newRow.skill_check_id);
    }
    editCell.append(editCellButton);

    // Adds delete button to new row with icon
    let deleteCellButton = document.createElement("button");
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/img/delete-icon.svg";
    deleteIcon.width= 39;
    deleteIcon.height = 30;
    deleteCellButton.append(deleteIcon);
    deleteCellButton.onclick = function(){
        deleteEvent(newRow.skill_check_id);
    };

    deleteCell.appendChild(deleteCellButton);    

    row.appendChild(idCell);
    row.appendChild(descriptionCell);
    row.appendChild(rollCell);
    row.appendChild(difficultyCell);
    row.appendChild(difficultyValueCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute("data-value", newRow.skill_check_id);

    currentTable.appendChild(row);
}