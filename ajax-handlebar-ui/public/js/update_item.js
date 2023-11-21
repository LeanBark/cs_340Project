// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


function updateItem(item_id) {
    let table = document.getElementById("items-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == item_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let nameInd = updateRowIndex.getElementsByTagName("td")[1];
            let quantityInd = updateRowIndex.getElementsByTagName("td")[2];
            let typeInd = updateRowIndex.getElementsByTagName("td")[3];
            let editInd = updateRowIndex.getElementsByTagName("td")[4];
            
            let nameInput = document.getElementById("update-item-name");
            nameInput.value = nameInd.innerHTML;
            nameInd.innerHTML = "";
            nameInd.appendChild(nameInput);

            let quantityInput = document.getElementById("update-item-quantity");
            quantityInput.value = quantityInd.innerHTML;
            quantityInd.innerHTML = "";
            quantityInd.appendChild(quantityInput);

            let typeOptions = document.getElementById("update-item-type");
            for (let i = 0; i < typeOptions.length; i++){
                let option = typeOptions.options[i];
                if (option.text == typeInd.innerHTML){
                    typeOptions.value = option.value;
                    typeOptions.text = option.text;
                }
            }

            typeInd.innerHTML = "";
            typeInd.appendChild(typeOptions);

            let submitButton = document.createElement("button");
            let submitIcon = document.createElement("img");
            submitIcon.src = "/img/submit-icon.svg";
            submitIcon.width= 39;
            submitIcon.height = 30;
            submitButton.append(submitIcon);
            submitButton.onclick = function(){
                submitItem(item_id);
            }

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(submitButton);
        }
    }
}

//------------Clicking submit button in edit item infromation form retrieves the input data for updating item----//
function submitItem(item_id){
    let inputName = document.getElementById("update-item-name");
    let inputQuantity = document.getElementById("update-item-quantity");
    let inputType = document.getElementById("update-item-type");

    let inputId = item_id.toString();
    let inputNameValue = inputName.value;
    let inputQuantityValue = inputQuantity.value;
    let inputTypeValue = inputType.value;

    //---- Organizes data according to their respective values to send as response to ajax request according to selected item name---//
    let data = {
        id: inputId,
        name: inputNameValue,
        quantity: inputQuantityValue,
        item_type_id: inputTypeValue
    }

//---------------Places AJAX Request------------------------------//
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/update-item', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, item_id);
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
}

//--------------------Function is passed response data and Updates Input Values of selected item by their item_id---------------------//
function updateRow(data, item_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("items-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == item_id){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let nameInd = updateRowIndex.getElementsByTagName("td")[1];
            let quantityInd = updateRowIndex.getElementsByTagName("td")[2];
            let typeInd = updateRowIndex.getElementsByTagName("td")[3];
            let editInd = updateRowIndex.getElementsByTagName("td")[4];

            let hiddenForm = document.getElementById("update-item-form");

            let editButton = document.createElement("button");
            let editIcon = document.createElement("img");
            editIcon.src = "/img/edit-icon.svg";
            editIcon.width= 39;
            editIcon.height = 30;
            editButton.append(editIcon);
            editButton.onclick = function(e){
                updateItem(item_id);
            }

            hiddenForm.appendChild(nameInd.removeChild(nameInd.children[0]));
            nameInd.innerHTML = parsedData[0].name;

            hiddenForm.appendChild(quantityInd.removeChild(quantityInd.children[0]));
            quantityInd.innerHTML = parsedData[0].quantity;

            hiddenForm.appendChild(typeInd.removeChild(typeInd.children[0]));
            typeInd.innerHTML = parsedData[0].item_type_id;

            editInd.removeChild(editInd.children[0]);
            editInd.appendChild(editButton);
        }
        
    }
}