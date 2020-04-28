/*
    This is called Calculator Project. It is done as part of the curriculum taught in the course "Intro to Web Development v2" at Frontendmasters.

    Course Author: Brian Holt.

    Project Objective: Creating a web application that gives the appearance of a calculator on a web page and does all the Math operations listed in it.

    File name: calculator.js
*/

/*
Tested and working fine as on 13th August, 2019.
*/

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null; // This line is present in the video's example but absent in calculator.js file present in the course's Github account.

            break;
        case "=":
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case "⟵":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;

            /*
            In calculator.js file from the course's Girhub account the following code is written in place of default:

            case "+":
            case "−":
            case "×":
            case "÷":
                handleMath(value);
                break;
            */
    }
}

function handleMath(value) {
    if (buffer === "0") {
        // do nothing
        return;
    }
    // above section of if statement is taken from the calculator.js file posted in the course's Github page.

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}

/*
In calculator.js file from the course's Githib account, document.querySelector part of the code is written in a separate function called init() and was then called subsequently.

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
*/

document.querySelector('.calc-buttons').addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
})