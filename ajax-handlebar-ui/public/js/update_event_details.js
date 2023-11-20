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
            
            let actionOptions = document.getElementById("update-action");
            
            for(let i=0; i<actionOptions.length; i++){
                let option = actionOptions.options[i];
                if (option.text == actionInd.innerHTML){
                    actionOptions.value = option.value;
                    actionOptions.text = option.text;
                }
            }
            actionInd.innerHTML= "";
            actionInd.appendChild(actionOptions);

            let characterOptions = document.getElementById("update-character");
            for(let i=0; i<characterOptions.length; i++){
                let option = characterOptions.options[i];
                if (option.text == characterInd.innerHTML){
                    characterOptions.value = option.value;
                    characterOptions.text = option.text;
                }
            }
            characterInd.innerHTML = "";
            characterInd.appendChild(characterOptions);

            let itemOptions = document.getElementById("update-item");
            for (let i=0; i<itemOptions.length; i++){
                let option = itemOptions.options[i];
                if (option.text == itemInd.innerHTML){
                    itemOptions.value = option.value;
                    itemOptions.text = option.text;
                }
            }
            itemInd.innerHTML = "";
            itemInd.appendChild(itemOptions)
            
            let skillCheckOptions = document.getElementById("update-skill-check");
            for (let i=0; i<skillCheckOptions.length; i++){
                let option = skillCheckOptions.options[i];
                if (option.text == skillCheckInd.innerHTML){
                    skillCheckOptions.value = option.value;
                    skillCheckOptions.text = option.text;
                }
            }
            skillCheckInd.innerHTML = "";
            skillCheckInd.appendChild(skillCheckOptions);
            

            
            let submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.onclick = function(){
                submitEventDetails(skill_check_details_id);
            };

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);

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
            editButton.onclick = function(e){
                updateEventDetails(skill_check_details_id);
            };
            console.log(parseData[0]);
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