// Citation for the following file:
// Date: 11/2/2023
// Adapted from OSU CS340 NodeJS Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//Citation for Icons:
//Date: 11/20/2023
// Icons for Submit, Delete, and Edit buttons were provided from svgrepo.com
// Source URL for Edit Icons: https://www.svgrepo.com/svg/511904/edit-1479
//Source URL for Submit Icons:https://www.svgrepo.com/svg/494419/submit-success-check-mark
//Soruce Url for Delete Icons: https://www.svgrepo.com/svg/499905/delete


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
            // deleteDropDownMenu(skill_check_id)
            break;
        }
    }

}