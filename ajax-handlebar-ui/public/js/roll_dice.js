// Citation for the following images:
// Date: 11/16/2023
// Credit attributed to: 

// Dice 20 faces 20 icon by Delapouite under CC BY 3.0
// Source URL: https://game-icons.net/1x1/delapouite/dice-twenty-faces-twenty.html

// Dice 20 faces 1 icon by Delapouite under CC BY 3.0
// Source URL: https://game-icons.net/1x1/delapouite/dice-twenty-faces-one.html




//implements swapping between dice images when user clicks D20 dice image displayed on homepage(home.hbs)
function rollDice() {
    let mainImg = document.getElementById("main-img");
    let mainImgButton = document.getElementById("main-img-button");
    let source = mainImg.getAttribute("src");
    mainImgButton.disabled = true;
    mainImg.setAttribute("class", "rotate-img")
    if (source == "./img/d20_critical_failure.png"){
        mainImg.setAttribute("src", "./img/d20_critical_success.png");
    } else {
        mainImg.setAttribute("src", "./img/d20_critical_failure.png");
    }
    setTimeout(() => {
        mainImg.setAttribute("class", "")
        mainImgButton.disabled = false;
    }, "550");
}
