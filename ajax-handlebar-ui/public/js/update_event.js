// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateEventForm = document.getElementById("update-event-form");


//------------Clicking submit button in edit event infromation form retrieves the input data for updating event----//
updateEventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputEvent = document.getElementById("selected-event");
    let inputRoll = document.getElementById("input-roll-value-update");
    let inputDifficulty = document.getElementById("input-difficulty-update");


    let inputEventValue = inputEvent.value;
    let inputRollValue = inputRoll.value;
    let inputDifficultyValue = inputDifficulty.value;

    //---- Organizes data according to their respective values to send as response to ajax request according to selected event name---//
    let data = {
        event: inputEventValue,
        roll: inputRollValue,
        difficulty: inputDifficultyValue
    }

//---------------Places AJAX Request------------------------------//
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/update-event', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, inputEventValue);
            inputEvent.value = '';
            inputRoll.value = '';
            inputDifficulty.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
})

//--------------------Function is passed response data and Updates Input Values of selected event by their event_id---------------------//
function updateRow(data, eventID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("events-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == eventID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let rollInd = updateRowIndex.getElementsByTagName("td")[2];
            let difficultyInd = updateRowIndex.getElementsByTagName("td")[3];
            let difficultyValueInd = updateRowIndex.getElementsByTagName("td")[4];

            rollInd.innerHTML = parsedData[0].roll_result;
            difficultyInd.innerHTML = parsedData[0].difficulty;  // HTML for parsed data instead of text
            difficultyValueInd.innerHTML = parsedData[0].value;
        }
        
    }
}