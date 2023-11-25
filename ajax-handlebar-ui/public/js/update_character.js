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

//-------------Function updates submitted form data displayed in characters table---------------------------//
function updateCharacter(character_id) {
    let table = document.getElementById("characters-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // character name
            document.getElementById("input-name-update").value =  updateRowIndex.getElementsByTagName("td")[1].innerHTML;
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[1].appendChild(document.getElementById("input-name-update"));
            // character level
            document.getElementById("input-lvl-update").value =  updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[2].appendChild(document.getElementById("input-lvl-update"));
            // strength value
            document.getElementById("input-str-update").value =  updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[3].appendChild(document.getElementById("input-str-update"));
            // dexterity value
            document.getElementById("input-dex-update").value =  updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[4].appendChild(document.getElementById("input-dex-update"));
            // constitution value
            document.getElementById("input-con-update").value =  updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[5].appendChild(document.getElementById("input-con-update"));
            // intelligence value
            document.getElementById("input-int-update").value =  updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[6].appendChild(document.getElementById("input-int-update"));
            // wisdom value
            document.getElementById("input-wis-update").value =  updateRowIndex.getElementsByTagName("td")[7].innerHTML;
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[7].appendChild(document.getElementById("input-wis-update"));
            // charisma value
            document.getElementById("input-chr-update").value =  updateRowIndex.getElementsByTagName("td")[8].innerHTML;
            updateRowIndex.getElementsByTagName("td")[8].innerHTML = '';
            updateRowIndex.getElementsByTagName("td")[8].appendChild(document.getElementById("input-chr-update"));
            // race selection
            for(let i=0; i < document.getElementById("input-race-update").length; i++){
                let option = document.getElementById("input-race-update").options[i];
                if(option.text == updateRowIndex.getElementsByTagName("td")[9].innerHTML){
                    document.getElementById("input-race-update").value = option.value;
                    document.getElementById("input-race-update").text = option.text;
                    updateRowIndex.getElementsByTagName("td")[9].innerHTML = '';
                    updateRowIndex.getElementsByTagName("td")[9].appendChild(document.getElementById("input-race-update"));
                    break;
                }
            }
            // class selection
            for(let i=0; i < document.getElementById("input-class-update").length; i++){
                let option = document.getElementById("input-class-update").options[i];
                if(option.text == updateRowIndex.getElementsByTagName("td")[10].innerHTML){
                    document.getElementById("input-class-update").value = option.value;
                    document.getElementById("input-class-update").text = option.text;
                    updateRowIndex.getElementsByTagName("td")[10].innerHTML = '';
                    updateRowIndex.getElementsByTagName("td")[10].appendChild(document.getElementById("input-class-update"));
                    break;
                }
            }
            // add edit and submit button with events
            let editInd = updateRowIndex.getElementsByTagName("td")[11];

            let submitButton = document.createElement("button");
            let submitIcon = document.createElement("img");
            submitIcon.src = "/img/submit-icon.svg";
            submitIcon.width= 39;
            submitIcon.height = 30;
            submitButton.append(submitIcon);
            submitButton.onclick = function(){
                submitCharacter(character_id);
            }

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);

        }
        
    }
}

//------------Clicking submit button in edit character information form retrieves the input data for updating character----//
function submitCharacter(character_id) {
    for (let i = 0; i<document.getElementById("input-race-update").length; i++){
        let option = document.getElementById("input-race-update").options[i];
        if (option.text == document.getElementById("input-race-update").innerText){
            document.getElementById("input-race-update").value = option.value;
            document.getElementById("input-race-update").text = option.text;
        }
    }

    for (let i = 0; i<document.getElementById("input-class-update").length; i++){
        let option = document.getElementById("input-class-update").options[i];
        if (option.text == document.getElementById("input-class-update").innerText){
            document.getElementById("input-class-update").value = option.value;
            document.getElementById("input-class-update").text = option.text;
        }
    }
    
    //---- Organizes data according to their respective values to send as response to ajax request according to selected character name---//
    let data = {
        id: character_id.toString(),
        name: document.getElementById("input-name-update").value,
        level: document.getElementById("input-lvl-update").value,
        strength: document.getElementById("input-str-update").value,
        dexterity: document.getElementById("input-dex-update").value,
        constitution: document.getElementById("input-con-update").value,
        intelligence: document.getElementById("input-int-update").value,
        wisdom: document.getElementById("input-wis-update").value,
        charisma: document.getElementById("input-chr-update").value,
        race_id: document.getElementById("input-race-update").value,
        class_id: document.getElementById("input-class-update").value
    }    


//---------------Places AJAX Request------------------------------//
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-character", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, character_id);
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
}

//--------------------Function is passed response data and Updates Input Values of selected character by their character_id---------------------//
function updateRow(data, character_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("characters-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == character_id){
            let hiddenForm = document.getElementById("update-character-form");
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // character name
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[1].removeChild(updateRowIndex.getElementsByTagName("td")[1].children[0]));
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[0].name;
            // level value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[2].removeChild(updateRowIndex.getElementsByTagName("td")[2].children[0]));
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].level;
            // strength value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[3].removeChild(updateRowIndex.getElementsByTagName("td")[3].children[0]));
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].strength;
            // dexterity value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[4].removeChild(updateRowIndex.getElementsByTagName("td")[4].children[0]));
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].dexterity;
            // constitution value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[5].removeChild(updateRowIndex.getElementsByTagName("td")[5].children[0]));
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].constitution;
            // intelligence value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[6].removeChild(updateRowIndex.getElementsByTagName("td")[6].children[0]));
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData[0].intelligence;
            // wisdom value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[7].removeChild(updateRowIndex.getElementsByTagName("td")[7].children[0]));
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = parsedData[0].wisdom;
            // charisma value
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[8].removeChild(updateRowIndex.getElementsByTagName("td")[8].children[0]));
            updateRowIndex.getElementsByTagName("td")[8].innerHTML = parsedData[0].charisma;
            // race selection
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[9].removeChild(updateRowIndex.getElementsByTagName("td")[9].children[0]));
            updateRowIndex.getElementsByTagName("td")[9].innerHTML = parsedData[0].race;
            // class selction
            hiddenForm.appendChild(updateRowIndex.getElementsByTagName("td")[10].removeChild(updateRowIndex.getElementsByTagName("td")[10].children[0]));
            updateRowIndex.getElementsByTagName("td")[10].innerHTML = parsedData[0].class;
            //edit button
            updateRowIndex.getElementsByTagName("td")[11].removeChild(updateRowIndex.getElementsByTagName("td")[11].children[0]);
            // adds icon to button before appending
            let editButton = document.createElement("button");
            let editIcon = document.createElement("img");
            editIcon.src = "/img/edit-icon.svg";
            editIcon.width= 39;
            editIcon.height = 30;
            editButton.append(editIcon);
            editButton.onclick = function(e){
                updateCharacter(character_id);
            }
            updateRowIndex.getElementsByTagName("td")[11].appendChild(editButton);
        }
        
        }
    }
