// Citation for the following file:
// Date: 11/7/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//Citation for Icons:
//Date: 11/20/2023
// Icons for Submit, Delete, and Edit buttons were provided from svgrepo.com
// Source URL for Edit Icons: https://www.svgrepo.com/svg/511904/edit-1479
//Source URL for Submit Icons:https://www.svgrepo.com/svg/494419/submit-success-check-mark
//Soruce Url for Delete Icons: https://www.svgrepo.com/svg/499905/delete

let addDiffForm = document.getElementById("add-difficulty-form");

// toggles whether add form is displayed to user
function displayForm (){
    if (addDiffForm.style.display == "none"){
        addDiffForm.style.display = "block";
    } else{
        addDiffForm.style.display = "none";
    }
}
displayForm();

// submits input information for adding to database table
addDiffForm.addEventListener("submit", function(e){
    e.preventDefault();

    let inputDiffName = document.getElementById("input-difficulty-value");
    let inputDescription = document.getElementById("input-diff-description");
    
    let inputDiffValue = inputDiffName.value;
    let inputDescriptionValue = inputDescription.value;

    let data = {
        value: inputDiffValue,
        description: inputDescriptionValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-difficulty', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputDiffName.value = '';
            inputDescription.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

// creates new row and adds it to existing HTML table
addRowToTable = (data) => {
    let currentTable = document.getElementById('difficulties-table');
    
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let valueCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");

    idCell.innerText = newRow.difficulty_id;
    valueCell.innerText = newRow.value;
    descriptionCell.innerText = newRow.description;

    row.appendChild(idCell);
    row.appendChild(valueCell);
    row.appendChild(descriptionCell);

    currentTable.appendChild(row);
}