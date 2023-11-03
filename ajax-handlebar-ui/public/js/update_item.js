// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateItemForm = document.getElementById("update-item-form");


//------------Clicking submit button in edit item infromation form retrieves the input data for updating item----//
updateItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputName = document.getElementById("selected-item");
    let inputQuantity = document.getElementById("input-quantity-update");
    let inputType = document.getElementById("input-type-update");


    let inputNameValue = inputName.value;
    let inputQuantityValue = inputQuantity.value;
    let inputTypeValue = inputType.value;

    //---- Organizes data according to their respective values to send as response to ajax request according to selected item name---//
    let data = {
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
            updateRow(xhttp.response, inputNameValue);
            inputName.value = '';
            inputQuantity.value = '';
            inputType.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in the input");
        }
    }
    xhttp.send(JSON.stringify(data));
})

//--------------------Function is passed response data and Updates Input Values of selected item by their item_id---------------------//
function updateRow(data, itemID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("items-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == itemID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let quantityInd = updateRowIndex.getElementsByTagName("td")[2];
            let typeInd = updateRowIndex.getElementsByTagName("td")[3];

            quantityInd.innerHTML = parsedData[0].quantity;
            typeInd.innerHTML = parsedData[0].item_type_id;  // HTML for parsed data instead of text
        }
        
    }
}