// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function updateEventDetails(skill_check_details_id) {
    let table = document.getElementById("event-details-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == skill_check_details_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let actionInd = updateRowIndex.getElementsByTagName("td")[1];
            let characterInd = updateRowIndex.getElementsByTagName("td")[2];
            let itemInd = updateRowIndex.getElementsByTagName("td")[3];
            let skillCheckInd = updateRowIndex.getElementsByTagName("td")[4];
            let editInd = updateRowIndex.getElementsByTagName("td")[5];
            
            let submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.onclick = function(){
                submitEventDetails(skill_check_details_id);
            };

            let actionOptions = document.getElementById("update-action");
            actionInd.innerHTML = "";
            actionInd.appendChild(actionOptions);

            let characterOptions = document.getElementById("update-character");
            characterInd.innerHTML = "";
            characterInd.appendChild(characterOptions);

            let itemOptions = document.getElementById("update-item");
            itemInd.innerHTML = "";
            itemInd.appendChild(itemOptions)
            
            let skillCheckOptions = document.getElementById("update-skill-check");
            skillCheckInd.innerHTML = "";
            skillCheckInd.appendChild(skillCheckOptions)
            
            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton)
        }
    }
}

function submitEventDetails(skill_check_details_id) {
    let updateAction = document.getElementById("update-action");
    let updateCharacter = document.getElementById("update-character");
    let updateItem = document.getElementById("update-item");
    let updateSkillCheck = document.getElementById("update-skill-check");

    let updateActionValue = updateAction.value;
    let updateCharacterValue = updateCharacter.value;
    let updateItemValue = updateItem.value;
    let updateSkillCheckValue = updateSkillCheck.value;

    // Organize data for AJAX request
    let data = {
        id: skill_check_details_id,
        action: updateActionValue,
        character: updateCharacterValue,
        item: updateItemValue,
        skillCheck: updateSkillCheckValue
    }

    // Place AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/update-event-details-ajax', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, skill_check_details_id);
            updateAction.value = '';
            updateCharacter.value = '';
            updateItem.value = '';
            updateSkillCheck.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateRow(data, skill_check_details_id){
    let parseData = JSON.parse(data);
    let table = document.getElementById("event-details-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == skill_check_details_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let actionInd = updateRowIndex.getElementsByTagName("td")[1];
            let characterInd = updateRowIndex.getElementsByTagName("td")[2];
            let itemInd = updateRowIndex.getElementsByTagName("td")[3];
            let skillCheckInd = updateRowIndex.getElementsByTagName("td")[4];
            let editInd = updateRowIndex.getElementsByTagName("td")[5];

            let hiddenForm = document.getElementById("update-event-details-form");

            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.onclick = function(){
                updateEventDetails(skill_check_details_id);
            };

            hiddenForm.appendChild(actionInd.removeChild(actionInd.children[0]));
            actionInd.innerHTML = parseData[0].action;

            hiddenForm.appendChild(characterInd.removeChild(characterInd.children[0]));
            characterInd.innerHTML = parseData[0].character;

            hiddenForm.appendChild(itemInd.removeChild(itemInd.children[0]));
            itemInd.innerHTML = parseData[0].item;

            hiddenForm.appendChild(skillCheckInd.removeChild(skillCheckInd.children[0]));
            skillCheckInd.innerHTML = parseData[0].skillCheck;

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(editButton);
        }
    }
}