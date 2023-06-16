// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () { // Function runs straight away. Note how original ( is not closed.
            if (this.getAttribute("data-type") === "submit") { //'this' used to refer to the specifc button pressed
                alert("You clicked submit!");
            } else {
                let gameType = this.getAttribute("data-type"); // here we find out what data type the button clicked has
                alert(`You clicked ${gameType}`); //Temporal literal used here
            }
        });
    }

});

/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/

function runGame() {

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25;) +1;
    let num2 = Math.floor(Math.random() * 25;) +1;
}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}