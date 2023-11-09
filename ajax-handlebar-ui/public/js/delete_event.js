// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteEvent(skill_check_id) {
    // Collect the data we want to send in an JS object
    let data = {
        id: skill_check_id
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX request
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete row from table
            deleteRow(skill_check_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(skill_check_id){

    let table = document.getElementById("events-table");
    // iterate through the rows
    for (let i = 0, row; row = table.rows[i]; i++) {
        // delete the the row corresonding to the PK
        if (table.rows[i].getAttribute("data-value") == skill_check_id) {
            table.deleteRow(i);
            deleteDropDownMenu(skill_check_id)
            break;
        }
    }

}

function deleteDropDownMenu(skill_check_id){
    let selectMenu = document.getElementById("selected-event");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(skill_check_id)){
            selectMenu[i].remove();
            break;
        }
    }
}
