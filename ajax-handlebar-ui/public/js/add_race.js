// Citation for the following file:
// Date: 11/7/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addRaceForm = document.getElementById("add-race-form");

function displayForm (){
    if (addRaceForm.style.display == "none"){
        addRaceForm.style.display = "block";
    } else{
        addRaceForm.style.display = "none";
    }
}
displayForm();

addRaceForm.addEventListener("submit", function(e){
    e.preventDefault();

    let inputRaceName = document.getElementById("input-race-name");
    let inputDescription = document.getElementById("input-race-description");
    
    let inputRaceValue = inputRaceName.value;
    let inputDescriptionValue = inputDescription.value;

    let data = {
        name: inputRaceValue,
        description: inputDescriptionValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-race', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputRaceName.value = '';
            inputDescription.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('races-table');
    
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");

    idCell.innerText = newRow.race_id;
    nameCell.innerText = newRow.name;
    descriptionCell.innerText = newRow.description;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);

    currentTable.appendChild(row);

}