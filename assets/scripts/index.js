//Configure ClipboardJS for copy button.
$(document).ready(function() {
    new ClipboardJS(".btn"); 
}); 

//PAGE ELEMENTS

const submitButton = document.getElementById("submit-button"); 


//EVENTS

submitButton.addEventListener("click", validateInputs); 


//FUNCTIONS

function validateInputs() {
    //Clean the passsword output field.
    document.getElementById("password-output").innerHTML = ""; 
    //This function passes the user's input through two validation tests before generating the password. 
    //Validate length first.
    if(validateLength()) {  
        //Then validate checkboxes.
        if(validateCheckboxes()) {
            //Finally, generate password. 
            generatePassword(); 
        } 
    } 
}

function displayWarning(message) {
    //This function generates HTML in the modal that describes the input error. 
    document.getElementById("messageModalLabel").innerHTML = "<span class='text-danger'>" + "Invalid Input" + "</span>";  
    document.getElementById("password-output").innerHTML = message; 
    document.getElementById("copy-button").style.display = "none"; 
}

function generatePassword() {
    //This function generates the password and displays it on the screen. 
    
    //Access user's selections (already validated). 
    const length = Number(Math.floor(document.getElementById("inputLength").value));
    const isUppercase = document.getElementById("selectUppercase").checked; 
    const isLowercase = document.getElementById("selectLowercase").checked; 
    const isNumbers = document.getElementById("selectNumbers").checked; 
    const isSpecialchar = document.getElementById("selectSpecial").checked; 

    //Create array to push all possible characters to, based on selections. Set password to empty string. 
    let possibleCharacters = []; 
    //let password = ""; 
    let password = []; 
    console.log(possibleCharacters); 

    //Populate all possible characters based on user's selections, utilizing the String fromCharCode method.  
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
    
    //Generate password of user's given length using available characters in the now populated array. 

    for(let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * possibleCharacters.length); 
        console.log(randomIndex); 
        //password += possibleCharacters[randomIndex]; 
        password.push(possibleCharacters[randomIndex]); 
        console.log(typeof(possibleCharacters[randomIndex])); 
        console.log('password: ' + password); 
    }
    console.log('-----'); 

    //Display contents to the user. 
    document.getElementById("messageModalLabel").innerHTML = "<span class='text-primary'>" + "Your Secure Password" + " <i class='fas fa-lock'></i>" + "</span>"; 
    //document.getElementById("password-output").innerHTML = password; 
    password.forEach((character) => {
        document.getElementById("password-output").innerHTML += character; 
    }); 
    document.getElementById("copy-button").style.display = "initial"; 
}

//Validation functions for each input type

function validateLength() {
    //Access user's length input. Round down (prevent decimals) and parse to a number.
    const length = Number(Math.floor(document.getElementById("inputLength").value));

    //Check if input is not valid or if it is too short or too long. 
    if(!length || isNaN(length) || length < 8 || length > 128) {
        //Pass this warning to the user. 
        displayWarning("Enter a whole number password length between 8 and 128."); 
        return false; 
    } else {
        //If the input passes validation tests, return to go through next validation. 
        return true; 
    }
}

function validateCheckboxes() {
    //Access the user's checked selections for character types, and make sure at least one is selected. 
    const isUppercase = document.getElementById("selectUppercase").checked; 
    const isLowercase = document.getElementById("selectLowercase").checked; 
    const isNumbers = document.getElementById("selectNumbers").checked; 
    const isSpecialchar = document.getElementById("selectSpecial").checked; 

    //Verify that at least one type has a truth value. 
    if(isUppercase || isLowercase || isNumbers || isSpecialchar) {
        return true;
    } else {
        //Pass this warning to the user. 
        displayWarning("You must select at least one character type."); 
        return false; 
    }
}