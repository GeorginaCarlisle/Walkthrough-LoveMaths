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
    /**
     * Computer will listen for the user pressing a key. If the key that they press is enter
     * then the checkAnswer function will be run
     */
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
});

/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/

function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus(); //This sets the focus to the answer box, so that the curser is there ready to type. You don't have to click the box and instead can type straight away

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    }
    else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
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
        incrementScore();
    } else {
        alert(`Awwwww..... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
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
    else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    }
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the correct answer score from the DOM and increments it by one
 */
function incrementScore() {
    let currentScore = parseInt(document.getElementById("score").innerText);
    currentScore += 1;
    document.getElementById("score").textContent = currentScore;
}

/**
 * Gets the incorrect answer score from the DOM and increments it by one
 */
function incrementWrongAnswer() {
    let currentScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").textContent = ++currentScore; //I have done this different to incrementScore, both ways work they are just different.
}

/**
 * Takes the two random numbers generated in runGame and places them in the question
 * Also changes the operator to a plus symbol
 */
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}
/**
 * Takes the two random numbers generated in runGame and places the biiger value in the first slot (operand1) 
 * and the smaller value in the second slot
 * Also changes the operator to a minus symbol
 */
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

/**
 * Takes the two random numbers generated in runGame and places them in the question
 * Also changes the operator to a times symbol
 */
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}