//function creates as variables the page items as well as values 
//function uses random number generators to retrieve items 
//function outputs password to screen 

const submitButton = document.getElementById("submit-button"); 


//EVENTS
submitButton.addEventListener("click", validateInputs); 


//FUNCTIONS

function validateInputs() {
     
    if(validateLength()) { //Validate length first. 
        console.log('passed validate length and returned back'); 
        //Then validate checkboxes.
        if(validateCheckboxes()) {
            console.log('passed validate checkboxes and returned back'); 
            generatePassword(); 
        } else {
            console.log('failed validate checkboxes and returned back'); 
        }
    } 

}

function displayWarning(message) {
    console.log(message); 
    //this function generates html in the modal that describes error and highlights fields needing changes

}

function generatePassword() {
    //this function generates password, closes modal, and displays password on the screen
    
    //access values 
    //const length = Number(Math.floor(document.getElementById("inputLength").value));


    //Create array to push all possible characters to, based on selections.
    //let possibleCharacters = []; 

    console.log("Running generate password function"); 
}


//Validation functions for each input type

function validateLength() {
    //Access user's length input. Round down (prevent decimals) and parse to a number.
    const length = Number(Math.floor(document.getElementById("inputLength").value));

    //Check if input is not valid or if it is too short or too long. 
    if(!length || isNaN(length) || length < 8 || length > 128) {
        displayWarning("Invalid password length. Enter a whole number between 8-128."); 
        return false; 
    } else {
        //If the input passes validation tests, generate password. 
        console.log('VALID'); 
        return true; 
        //generatePassword(); 
    }
}

function validateCheckboxes() {
    //Access 

    const isUppercase = document.getElementById("selectUppercase").checked; 
    const isLowercase = document.getElementById("selectLowercase").checked; 
    const isNumbers = document.getElementById("selectNumbers").checked; 
    const isSpecialchar = document.getElementById("selectSpecial").checked; 

    if(isUppercase || isLowercase || isNumbers || isSpecialchar) {
        return true;
    } else {
        displayWarning("You must select at least one character type."); 
        return false; 
    }
}