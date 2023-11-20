// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addItemForm = document.getElementById("add-item-form");

addItemForm.addEventListener("submit", function(e){
    e.preventDefault();
    let inputItemName = document.getElementById("input-item-name");
    let inputQuantity = document.getElementById("input-quantity");
    let inputType = document.getElementById("input-item-type");

    let inputNameValue = inputItemName.value;
    let inputQuanityValue = inputQuantity.value;
    let inputTypeValue = inputType.value;

    let data = {
        name: inputNameValue,
        quantity: inputQuanityValue,
        item_type_id: inputTypeValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-item", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputItemName.value = '';
            inputQuantity.value = '';
            inputType.value = '';
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('items-table');
    
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let editCell = document.createElement("td");

    let editCellButton = document.createElement("button");
    editCellButton.innerText = "Edit";
    editCellButton.onclick = function(){
        updateItem(newRow.item_id);
    }
    editCell.append(editCellButton);

    idCell.innerText = newRow.item_id;
    nameCell.innerText = newRow.name;
    quantityCell.innerText = newRow.quantity;
    typeCell.innerText = newRow.type;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(typeCell);
    row.appendChild(editCell);
    
    row.setAttribute("data-value", newRow.item_id)

    currentTable.appendChild(row);
    
    /*
    let selectMenu = document.getElementById("selected-item");
    let selectOption = document.createElement("option");
    selectOption.text = newRow.name;
    selectOption.value = newRow.item_id;
    selectMenu.add(selectOption);
    */
}