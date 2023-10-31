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


    idCell.innerText = newRow.item_id;
    nameCell.innerText = newRow.name;
    quantityCell.innerText = newRow.quantity;
    typeCell.innerText = newRow.item_type_id;


    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(typeCell);

    // row.setAttribute("data-value", newRow.character_id)

    currentTable.appendChild(row);
}
    // let selectMenu = document.getElementById("selected-character");
    // let selectOption = document.createElement("option");
    // selectOption.text = newRow.name;
    // selectOption.value = newRow.character_id;
    // selectMenu.add(selectOption);//