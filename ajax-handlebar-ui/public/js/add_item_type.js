// Citation for the following file:
// Date: 11/7/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addTypeForm = document.getElementById("add-item-type-form");

function displayForm (){
    if (addTypeForm.style.display == "none"){
        addTypeForm.style.display = "block";
    } else{
        addTypeForm.style.display = "none";
    }
}
displayForm();

addTypeForm.addEventListener("submit", function(e){
    e.preventDefault();

    let inputTypeName = document.getElementById("input-type-name");
    
    let inputTypeValue = inputTypeName.value;

    let data = {
        name: inputTypeValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-item-type', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputTypeName.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('item-types-table');
    
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");

    idCell.innerText = newRow.item_type_id;
    nameCell.innerText = newRow.name;

    row.appendChild(idCell);
    row.appendChild(nameCell);

    currentTable.appendChild(row);

}