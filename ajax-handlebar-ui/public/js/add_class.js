// Citation for the following file:
// Date: 11/7/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addClassForm = document.getElementById("add-class-form");

// toggles whether add form is displayed to user
function displayForm (){
    if (addClassForm.style.display == "none"){
        addClassForm.style.display = "block";
    } else{
        addClassForm.style.display = "none";
    }
}
displayForm(); // must be called once to respond onf first click

// submits input information for adding to database table
addClassForm.addEventListener("submit", function(e){
    e.preventDefault();

    let inputClassName = document.getElementById("input-class-name");
    let inputDescription = document.getElementById("input-class-description");
    
    let inputClassValue = inputClassName.value;
    let inputDescriptionValue = inputDescription.value;

    let data = {
        name: inputClassValue,
        description: inputDescriptionValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-class', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputClassName.value = '';
            inputDescription.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

// creates new row and adds it to existing HTML table
addRowToTable = (data) => {
    let currentTable = document.getElementById('classes-table');
    
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");

    idCell.innerText = newRow.class_id;
    nameCell.innerText = newRow.name;
    descriptionCell.innerText = newRow.description;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);

    currentTable.appendChild(row);

}