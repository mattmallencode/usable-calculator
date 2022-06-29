# Usable Calculator (Incomplete Prototype)
* Calculator made in vanilla HTML, CSS, and, JavaScript. 
* "This is a "usable" redesign of the website and calculator found on: https://www.online-calculator.com/
* **Important:** This prototype is incomplete and is simply a proof of concept based on the issues identified - e.g. brackets do not work.

# Goals of redesign
* Appeal to the needs of the target audience
* Minimize short-term memory demand
* Use suitable interaction styles
* Improve ease of navigation
* Reduce the app's learning curve
* Ensure all widgets are suitable
* Improve accessibility
* Strive for consistency, prevent and handle errors, and offer informative feedback

# Proposed redesign

## Accessibility
* Make calculator from HTML elements rather than drawing it on a canvas
* Set the html "lang" attribute to "en"
* Enclose the navigation section in a nav element
* Use better contrasting colours for the search bar to make the hint easier to read

## Calculator Functionality
* Remove memory, fractions, and roots. Move this more advanced functionality to a "scientific" calculator on the website
* Permit easy reversal of actions: allow the user to delete numbers they have entered one at a time
* Allow the user to convert percentage points into decimals
* Allow the user to enter both opening and closing brackets to specify operator precedence
* Allow users to choose any numerator they want for fractions on the scientific calculator and don't limit them to square roots

## Calculator Visuals & Errors
* The calculator will dominate the screen space by default
* Some text will show the value currently stored in the scientific calculator's memory
* The screen will display calculations as the user types them until the user presses equals
* The design highlights the last button the user pressed with a colour change
* The new design prevents errors with additional logic - the order of operations will not matter
* The error messages in the redesign will be more descriptive, rather than just reading "Error" - for example, "Can not divide by 0"
* There will be a "tally" as the user enters numbers, they will display on the screen and under that will be the current result of the calculation

## Search Bar
* Change the search bar’s input hint to: “search for the other tools and calculators on our site, e.g. "BMI calculator"

## Navigation
* The tools offered by the website will be categorised and grouped into drop-down menus - better use of the menu-selection interaction style.
* Any advertising in the redesign will feature on the margins (and not in the centre) to not interfere with the user’s interaction with the calculator.
* Advertisements will only render once. Re-rendering causes the page content to shift, which is disorientating for users.
* Users will not have to scroll down to navigate because the navigation bar will be at the top of the screen rather than the bottom.

## Tutorial
* To reduce the learning curve, a paragraph above the calculator will detail the fact that the user can interact with the calculator using a keyboard.
* For the scientific calculator there will be an expandable dialogue explaining how to use that calculator's more advanced features.

# Live version
https://cs1.ucc.ie/~mm55/usability/index.html

# Attribution
1. Secure alternative to eval borrowed from: https://www.educative.io/edpresso/eval-vs-function-in-javascript.
2. Calculator button layout mimics that of the default calculator app on my phone (Android).
3. All other credit can be attributed to Matt Mallen.
