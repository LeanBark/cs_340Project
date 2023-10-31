let addActionForm = document.getElementById("add-action-form");

addActionForm.addEventListener("submit", function(e){
    e.preventDefault();

    let inputActionName = document.getElementById("input-action-name");
    let inputActionValue = inputActionName.value;

    let data = {
        name: inputActionValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-action', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);
            inputActionName.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200){
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {
    let currentTable = document.getElementById('actions-table');
    
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");

    idCell.innerText = newRow.action_id;
    nameCell.innerText = newRow.name;

    row.appendChild(idCell);
    row.appendChild(nameCell);

    // row.setAttribute("data-value", newRow.action_id);
    currentTable.appendChild(row);

}