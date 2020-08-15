//function creates as variables the page items as well as values 
//function uses random number generators to retrieve items 
//function outputs password to screen 

//PAGE ELEMENTS
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
    //REFACTOR later 
    const length = Number(Math.floor(document.getElementById("inputLength").value));
    const isUppercase = document.getElementById("selectUppercase").checked; 
    const isLowercase = document.getElementById("selectLowercase").checked; 
    const isNumbers = document.getElementById("selectNumbers").checked; 
    const isSpecialchar = document.getElementById("selectSpecial").checked; 

    //Create array to push all possible characters to, based on selections.
    let possibleCharacters = []; 
    let password = ""; 

    console.log('Running password function.')

    //Populate all possible characters 
    if(isUppercase) {
        //If the user selected uppercase letters, populate possible characters array with every uppercase letter.
        for(let i = 65; i <= 90; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
    }

    if(isLowercase) {
        //If the user selected lowercase letters, populate possible characters array with every lowercase letter.
        for(let i = 97; i <= 122; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
    }

    if(isNumbers) {
        //If the user selected numbers, populate possible characters array with every number.
        for(let i = 48; i <= 57; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
    }

    if(isSpecialchar) {
        //If the user selected special characters, populate possible characters array with every special character.
        for(let i = 33; i <= 47; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
        for(let i = 58; i <= 64; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
        for(let i = 91; i <= 96; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
        for(let i = 123; i <= 126; i++) {
            possibleCharacters.push(String.fromCharCode(i)); 
        }
    }

    console.log(possibleCharacters);
    
    //Generate password using available characters

    for(let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * possibleCharacters.length); 
        //console.log(possibleCharacters[randomIndex]); 
        password += possibleCharacters[randomIndex]; 
    }

    console.log(password); 
    
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