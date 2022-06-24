/*
    Attribution: 
    1. Secure alternative to eval borrowed from: https://www.educative.io/edpresso/eval-vs-function-in-javascript.
    2. Calculator button layout mimics that of the default calculator app on my phone (Android).
    3. All other credit can be attributed to Matt Mallen.
*/

// The calculator's display elements.
let calculation = document.getElementById("calculation");
let tally = document.getElementById("tally");

// The calculator's buttons.
let clearBtn = document.getElementById("clear");
let delbtn = document.getElementById("delete");
let numbers = document.getElementsByClassName("number");
let operators = document.getElementsByClassName("operator");
let equalsBtn = document.getElementById("equals");
let highlightedBtn = undefined;

// Variables to keep track of what decimal precision the calculator should output.
let floatTrackOn = false;
let floatTrack = 0;
let floatTrackMax = 0;

// Variable to keep track of whether the user has hit equals.
let equaled = false;

// Take keyboard input from user.
document.addEventListener("keydown", function(e){

    // If the key is a number, percentage character, or decimal point. Add and calculate.
    if (e.key === "1" || e.key === "2" || e.key === "3" ||
        e.key === "4" || e.key === "5" || e.key === "6" ||
        e.key === "7" || e.key === "8" || e.key === "9" ||
        e.key === "0" || e.key === "%" || e.key === ".") {
            addText(e.key);
            calculate();
    }

    // If the key is an operator, run this code block. 
    if (e.key === "-" || e.key === "+" || e.key === "=" ||
        e.key === "*" || e.key === "/") {

        // If the calculation isn't empty and the last character in the calculation is a number, run this code block.
        if (calculation.innerText !== "" && Number.isInteger(Number(calculation.innerText.slice(-1)))) {

            // If the user had just hit equals, run this code block.
            if (equaled == true) {

                // Clear the display, set the calculation equal to the tally and set equaled to false.
                tempText = tally.innerText;
                clear();
                addText(tempText);
                equaled = false;
            }

            // Stop keeping track of the most recent run of decimal points.
            floatTrackOn = false;
            floatTrack = 0;

            // Add the operator to the calculation, accounting for special characters i.e. "*" = "x".
            if (e.key === "*") {
                addText("x");
            } else if (e.key === "/") {
                addText("÷")
            } else {
                addText(e.key);
            }
            calculate();
        }
        }

    // If the key is a backspace i.e. delete, call delete.
    if (e.key === "Backspace") {
        del();

        // If the delete function has deleted all the calculation, clear the display.
        if (calculation.innerText === "") {
            clear();

        // If there's still some of the calculation left after deleting, recalculate the tally.
        } else {
            calculate();
        }
    }

    // If they key is c i.e. AC, call clear.
    if (e.key === "c") {
        clear();
    }
});

// Clear the calculator display on startup.
clear();

// The calculation should start off bold and larger than the tally / result.
calculation.className = "larger";
tally.className = "smaller";

// When the user clicks the "AC" button, clear the screen and highlight that button.
clearBtn.addEventListener("mousedown", function() {
    clear();
    highlight(clearBtn);
});

// When the user clicks the "DEL" button, delete a character from the calculation.
delbtn.addEventListener("mousedown", function() {

    // Run the delete function.
    del();

    // If the delete function has deleted all the calculation, clear the display.
    if (calculation.innerText === "") {
        clear();

    // If there's still some of the calculation left after deleting, recalculate the tally.
    } else {
        calculate();
    }
    highlight(delbtn);
});

// If the user hits the equals button, calculate the tally and make the tally bolder and bigger than the calculation.
equalsBtn.addEventListener("mousedown", function() {
    calculate();
    calculation.className = "smaller";
    tally.className = "larger";

    // Highlight the equals button and set equaled to true.
    highlight(equalsBtn);
    equaled = true;
});

// Highlight the last button the user pressed.
// Add that button to the selected class and remove the last selected button from the selected class.
function highlight(btn) {
    if (highlightedBtn !== undefined) {
        highlightedBtn.className = highlightedBtn.className.slice(0, -9);
    }
    highlightedBtn = btn;
    highlightedBtn.className = highlightedBtn.className + " selected";
}

// Loop through each of the number buttons.
for (let i = 0; i < numbers.length; i++) {

    // When a number button is clicked, run this code block.
    numbers[i].addEventListener("mousedown", function() {

        // If the user had just hit equals, clear the display and  set equaled to false.
        if (equaled == true) {
            clear();
            equaled = false;
        }

        // Add the number to the display, recalculate the tally and highlight this button.
        addText(numbers[i].innerText);
        calculate();
        highlight(numbers[i]);
    });
}

// Loop through each of the operator buttons.
for (let i = 0; i < operators.length; i++) {

    // When an operator button is clicked, run this code block.
    operators[i].addEventListener("mousedown", function() {

        // If the calculation isn't empty and the last character in the calculation is a number, run this code block.
        if (calculation.innerText !== "" && Number.isInteger(Number(calculation.innerText.slice(-1)))) {

            // If the user had just hit equals, run this code block.
            if (equaled == true) {

                // Clear the display, set the calculation equal to the tally and set equaled to false.
                tempText = tally.innerText;
                clear();
                addText(tempText);
                equaled = false;
            }

            // Stop keeping track of the most recent run of decimal points.
            floatTrackOn = false;
            floatTrack = 0;

            // Add the operator to the calculation and highlight this operator button.
            addText(operators[i].innerText);
            highlight(operators[i]);
        }
    });
}

// Function to clear the calculator's display.
function clear() {

    // Set the calculation text to an empty string.
    calculation.innerText = "";

    // Set the tally text to an empty string.
    tally.innerText = "";

    // Stop keeping track of the most recent run of decimal points.
    floatTrackOn = false;
    floatTrack = 0;

    // Set the max number of decimal points in any one number to 0.
    floatTrackMax = 0;

    // Bold the calculation text and unbold the tally text. Make the calculation larger than the tally.
    calculation.className = "larger";
    tally.className = "smaller";
}

// Function to delete a character from the calculation.
function del() {

    // If we are tracking the number of decimal points in a number, decrease its number of decimal points.
    if (floatTrackOn === true) {
        floatTrack --;
    }

    // Delete the last character from the calculation's string.
    calculation.innerText = calculation.innerText.slice(0, -1);
}

// Function to add a number or operator to the calculation.
function addText(text) {

    // If the character being added is a percentage character, start tracking decimal points.
    if (text === "%") {
        floatTrackOn = true;
    }

    // If we are tracking the number of decimal points in a number, increase its number of decimal points.
    if (floatTrackOn === true) {

        // If the character being added is a percentage character, run this code block.
        if (text === "%") {

            // Numbers converted to a percentage will have 2 decimal points by default.
            floatTrack = 2;

            // Variable to track how many digits are in the number being converted to a percentage.
            percentFloatTrack = -1;

            // Variable to store digits before the percentage character.
            tempString = "";

            // tempCalculation is the reversed calculation string.
            tempCalculation = calculation.innerText.split("");
            tempCalculation = tempCalculation.reverse();
            tempCalculation = tempCalculation.join("");

            // Loop through the reversed calculation.
            for (let i = 0; i < tempCalculation.length; i++) {

                // If we come across an operator, break out of the loop.
                if (["÷", "x", "+", "-"].includes(tempCalculation[i])) {
                    break;
                }

                // Increase the number of digits before the percentage character.
                percentFloatTrack ++;

                // If the character is a decimal point run this code block.
                if (tempCalculation[i] == ".") {

                    // The number of decimal points is float track plus the percentage float track.
                    floatTrack += percentFloatTrack;
                }

                // Add the current character to the temp string.
                tempString += tempCalculation[i];

                // If the number of decimals tracked currently is greater than max, update the max.
                if (floatTrack > floatTrackMax) {
                    floatTrackMax = floatTrack;
                }
            }

            // Reverse the tempString and convert it into a number.
            tempString = tempString.split("");
            tempString = tempString.reverse();
            tempString = tempString.join("");
            number = Number(tempString);

            // To convert the percentage number into a decimal divide it by 100.
            number = number / 100;

            // Replace the original number in the calculation with the converted number.
            calculation.innerText = calculation.innerText.slice(0, -1 * (percentFloatTrack+1)) + number.toFixed(floatTrackMax);

            // Break out of the function.
            return;

        // If the character isn't a percentage point, increment floatTrack as normal.
        } else {
            floatTrack ++;
        }

        // If this number is now bigger than the largest number of decimal points in the calculation, update the max.
        if (floatTrack > floatTrackMax) {
            floatTrackMax = floatTrack;
        }
    }

    // If the text is a decimal point, run this code block.
    if (text === ".") {

        // If there is already a decimal point in the calculation, run this code block.
        if (calculation.innerText.includes(".")) {

            // tempCalculation is the reversed calculation string.
            tempCalculation = calculation.innerText.split("");
            tempCalculation = tempCalculation.reverse();
            tempCalculation = tempCalculation.join("");

            // Loop through the reversed calculation.
            for (let i = 0; i < tempCalculation.length; i++) {

                // If we come across an operator, break and start tracking decimal points.
                if (["÷", "x", "+", "-"].includes(tempCalculation[i])) {
                    floatTrackOn = true;
                    break;
                }

                // If we come across a decimal point without coming across an operator, don't add the decimal point.
                if (tempCalculation[i] === ".") {
                    return;
                }
            }
        }

        // If the last digit is not a number or if the calculation is empty, don't add the decimal point.
        if (!Number.isInteger(Number(calculation.innerText.slice(-1))) | calculation.innerText === "") {
            return;
        }
    
    // Start tracking the number of decimal points.
    floatTrackOn = true;
    }

    // Add the number / operator to the calculation text.
    calculation.innerText += text;
}

// Function to calculate the user's calculation and display it to the screen.
function calculate() {

    // If the calculation is emtpy, return.
    if (calculation.innerText === "") {
        return;
    }

    // Replace the calculation's operator with operator's that javascript understands.
    calculationTemp = calculation.innerText;
    calculationTemp = calculationTemp.replaceAll("x", "*");
    calculationTemp = calculationTemp.replaceAll("÷", "/");
    calculationTemp = calculationTemp.replaceAll("%", "/100");

    // If the last digit is an operator, calculate everything before the operator.
    if (calculation.innerText.slice(-1) !== "%" && !Number.isInteger(Number(calculation.innerText.slice(-1)))) {

        // Function allows us to parse a string as a maths equation.
        // Display the result to the screen.
        let toEval = calculationTemp.slice(0, -1);
        let result = Function("return " + toEval);
        result = result();

        // If the result is a float but the user hasn't entered a decimal, set floatTrackMax to 2.
        if (result % 1 !== 0 && floatTrackMax === 0) {
            floatTrackMax = 2;
        }

        tally.innerText = result.toFixed(floatTrackMax).toString();
    
    // Otherwise, include the whole calculation.
    } else {

        // Function allows us to parse a string as a maths equation.
        // Display the result to the screen.
        let toEval = calculationTemp;
        let result = Function("return " + toEval);
        result = result();

        // If the result is a float but the user hasn't entered a decimal, set floatTrackMax to 2.
        if (result % 1 !== 0 && floatTrackMax === 0) {
            floatTrackMax = 2;
        }

        tally.innerText = result.toFixed(floatTrackMax);
    }
}