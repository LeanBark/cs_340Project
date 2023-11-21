// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


function updateEvent(skill_check_id) {
    let table = document.getElementById("events-table");

    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == skill_check_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let descriptionInd = updateRowIndex.getElementsByTagName("td")[1];
            let rollResultInd = updateRowIndex.getElementsByTagName("td")[2];
            let difficultyInd = updateRowIndex.getElementsByTagName("td")[3];
            let editInd = updateRowIndex.getElementsByTagName("td")[5];

            let descriptionInput = document.getElementById("input-description-update");
            descriptionInput.value = descriptionInd.innerHTML;
            descriptionInd.innerHTML = "";
            descriptionInd.appendChild(descriptionInput);
            
            let rollResultInput = document.getElementById("input-roll-value-update");
            rollResultInput.value = rollResultInd.innerHTML;
            rollResultInd.innerHTML = "";
            rollResultInd.appendChild(rollResultInput);

            let difficultyOptions = document.getElementById("input-difficulty-update");
            for (let i = 0; i < difficultyOptions.length; i++){
                let option = difficultyOptions.options[i];
                let text_array = option.text.split(":")
                if (text_array[0] == difficultyInd.innerHTML){
                    difficultyOptions.value = option.value;
                    difficultyOptions.text = option.text;
                }
            }

            difficultyInd.innerHTML = "";
            difficultyInd.appendChild(difficultyOptions);

            let submitButton = document.createElement("button");
            let submitIcon = document.createElement("img");
            submitIcon.src = "/img/submit-icon.svg";
            submitIcon.width= 39;
            submitIcon.height = 30;
            submitButton.append(submitIcon);
            submitButton.onclick = function(){
                submitEvent(skill_check_id);
            };

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);

        }
    }

}

//------------Clicking submit button in edit event infromation form retrieves the input data for updating event----//
function submitEvent(skill_check_id){
    let inputDescription = document.getElementById("input-description-update");
    let inputRoll = document.getElementById("input-roll-value-update");
    let inputDifficulty = document.getElementById("input-difficulty-update");

    let inputId = skill_check_id.toString();
    let inputDescriptionValue = inputDescription.value;
    let inputRollValue = inputRoll.value;
    let inputDifficultyValue = inputDifficulty.value;

    //---- Organizes data according to their respective values to send as response to ajax request according to selected event name---//
    let data = {
        id: inputId,
        description: inputDescriptionValue,
        roll: inputRollValue,
        difficulty: inputDifficultyValue
    }

//---------------Places AJAX Request------------------------------//
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/update-event', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, skill_check_id);
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
}

//--------------------Function is passed response data and Updates Input Values of selected event by their event_id---------------------//
function updateRow(data, skill_check_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("events-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == skill_check_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let descriptionInd = updateRowIndex.getElementsByTagName("td")[1];
            let rollInd = updateRowIndex.getElementsByTagName("td")[2];
            let difficultyInd = updateRowIndex.getElementsByTagName("td")[3];
            let difficultyValueInd = updateRowIndex.getElementsByTagName("td")[4];
            let editInd = updateRowIndex.getElementsByTagName("td")[5];

            let hiddenForm = document.getElementById("update-event-form");

            let editButton = document.createElement("button");
            let editIcon = document.createElement("img");
            editIcon.src = "/img/edit-icon.svg";
            editIcon.width= 39;
            editIcon.height = 30;
            editButton.append(editIcon);
            editButton.onclick = function(e){
                updateEvent(skill_check_id);
            }
            
            hiddenForm.appendChild(descriptionInd.removeChild(descriptionInd.children[0]));
            descriptionInd.innerHTML = parsedData[0].description;

            hiddenForm.appendChild(rollInd.removeChild(rollInd.children[0]));
            rollInd.innerHTML = parsedData[0].roll_result;
            
            hiddenForm.appendChild(difficultyInd.removeChild(difficultyInd.children[0]));
            difficultyInd.innerHTML = parsedData[0].difficulty;  // HTML for parsed data instead of text
            
            difficultyValueInd.innerHTML = parsedData[0].value;
            
            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(editButton);

        }
        
    }
}