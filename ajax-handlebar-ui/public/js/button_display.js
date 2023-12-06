
function hideButtons (primary_key){
    for (let i=1, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") != primary_key){
            let unselectedRow = table.getElementsByTagName("tr")[i];
            let rowLength = unselectedRow.getElementsByTagName("td").length;
            let endButton = unselectedRow.getElementsByTagName("td")[rowLength - 1];
            let leftElement = unselectedRow.getElementsByTagName("td")[rowLength - 2];
            endButton.children[0].style.display = "none";
            if (leftElement.children[0].tagName == "BUTTON"){
                leftElement.children[0].style.display = "none";
            }
        }
    }
}

function showButtons (primary_key){
    for (let i=1, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") != primary_key){
            let unselectedRow = table.getElementsByTagName("tr")[i];
            let rowLength = unselectedRow.getElementsByTagName("td").length;
            
            let endButton = unselectedRow.getElementsByTagName("td")[rowLength - 1];
            let leftElement = unselectedRow.getElementsByTagName("td")[rowLength - 2];
            endButton.children[0].style.display = "block";
            if (leftElement.children[0].tagName == "BUTTON"){
                leftElement.children[0].style.display = "block";
            }
        }
    }
}


