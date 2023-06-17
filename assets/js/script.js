// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () { // Function runs straight away. Note how original ( is not closed.
            if (this.getAttribute("data-type") === "submit") { //'this' used to refer to the specifc button pressed
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type"); // here we find out what data type the button clicked has
                runGame(gameType); //This then lonks through to the specific type of question clicked
            }
        });
    }
    runGame("addition");
});

/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/

function runGame(gameType) {

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    }
    else {
        alert(`Unknown game type: ${gameType}`); // in case of error in passing of parameter
        throw `Unknown game type: ${gameType}. Aborting!`; // if error does occur throw will terminate the gmae and pass the given error to the console
    }
}

/**
 * checks the answer against the first element in 
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right!");
    } else {
        alert(`Awwwww..... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operatorator (plus, minus etc.)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText); // parseInt used to convert string JavaScript pulls from the DOM into an integer.
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}