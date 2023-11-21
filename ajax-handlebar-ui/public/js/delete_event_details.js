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


function deleteEventDetails(skill_check_details_id) {
    // Put our data we want to send in a JavaScript object
    let data = {
        id: skill_check_details_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-event-details-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete row from table
            deleteRow(skill_check_details_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }
    // Send the request and wait for the resposne
    xhttp.send(JSON.stringify(data));
}

function deleteRow(skill_check_details_id){

    let table = document.getElementById("event-details-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through the rows
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == skill_check_details_id) {
            table.deleteRow(i);
            break;
        }
    }
}