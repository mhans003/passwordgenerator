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
    //This function passes the user's input through two validation tests before generating the password. 

    //Clean the passsword output field before starting.
    document.getElementById("password-output").innerHTML = ""; 

    //Access user's length input. Round down (prevent decimals) and parse to a number.
    const length = Number(Math.floor(document.getElementById("inputLength").value));

    //Check if input is not valid or if it is too short or too long. 
    if(!length || isNaN(length) || length < 8 || length > 128) {
        //Pass this warning to the user. 
        displayWarning("Enter a whole number password length between 8 and 128."); 
    } else {
        //Access the user's checked selections for character types, and make sure at least one is selected. 
        const isUppercase = document.getElementById("selectUppercase").checked; 
        const isLowercase = document.getElementById("selectLowercase").checked; 
        const isNumbers = document.getElementById("selectNumbers").checked; 
        const isSpecialchar = document.getElementById("selectSpecial").checked; 
    
        //Verify that at least one type has a truth value. 
        if(isUppercase || isLowercase || isNumbers || isSpecialchar) {
            generatePassword(length, isUppercase, isLowercase, isNumbers, isSpecialchar); 
        } else {
            //Pass this warning to the user. 
            displayWarning("You must select at least one character type."); 
        }
    }
}

function displayWarning(message) {
    //This function generates HTML in the modal that describes the input error. 
    document.getElementById("messageModalLabel").innerHTML = "<span class='text-danger'>" + "Invalid Input" + "</span>";  
    document.getElementById("password-output").innerHTML = message; 
    document.getElementById("copy-button").style.display = "none"; 
}

function generatePassword(length, isUppercase, isLowercase, isNumbers, isSpecialchar) {
    //This function generates the password and displays it on the screen. 

    //Create array to push all possible characters to, based on selections. Set password to empty string. 
    let possibleCharacters = []; 
    let password = []; 
    let possibleTypes = []; 

    //Populate all possible characters based on user's selections, utilizing the String fromCharCode method.  
    if(isUppercase) {
        //If the user selected uppercase letters, populate possible characters array with every uppercase letter.
        for(let i = 65; i <= 90; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isUppercase"
            }; 
            possibleCharacters.push(thisCharacter); 
        }
        possibleTypes.push("isUppercase"); 
    }

    if(isLowercase) {
        //If the user selected lowercase letters, populate possible characters array with every lowercase letter.
        for(let i = 97; i <= 122; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isLowercase"
            }; 
            possibleCharacters.push(thisCharacter); 
        }
        possibleTypes.push("isLowercase"); 
    }

    if(isNumbers) {
        //If the user selected numbers, populate possible characters array with every number.
        for(let i = 48; i <= 57; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isNumbers"
            }; 
            possibleCharacters.push(thisCharacter); 
        }
        possibleTypes.push("isNumbers"); 
    }

    if(isSpecialchar) {
        //If the user selected special characters, populate possible characters array with every special character.
        for(let i = 33; i <= 47; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isSpecialchar"
            }; 
            possibleCharacters.push(thisCharacter);  
        }
        for(let i = 58; i <= 64; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isSpecialchar"
            }; 
            possibleCharacters.push(thisCharacter); 
        }
        for(let i = 91; i <= 96; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isSpecialchar"
            }; 
            possibleCharacters.push(thisCharacter);  
        }
        for(let i = 123; i <= 126; i++) {
            let thisCharacter = {
                character: String.fromCharCode(i),
                type: "isSpecialchar"
            }; 
            possibleCharacters.push(thisCharacter); 
        }
        possibleTypes.push("isSpecialchar"); 
    }
    
    //Generate password of user's given length using available characters in the now populated array. 
    for(let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * possibleCharacters.length); 
        password.push(possibleCharacters[randomIndex]); 
    }

    //Verify that the password contains at least one of the selected character types.
    password = validateContents(password, possibleCharacters, possibleTypes); 

    //Display contents to the user. 
    document.getElementById("messageModalLabel").innerHTML = "<span class='text-primary'>" + "Your Secure Password" + " <i class='fas fa-lock'></i>" + "</span>"; 
    password.forEach((character) => {
        document.getElementById("password-output").innerHTML += character.character; 
    }); 

    //Display modal button. 
    document.getElementById("copy-button").style.display = "initial"; 
}

function validateContents(password, possibleCharacters, possibleTypes) {
    //This function makes sure at least one selected character of each type appears.

    //Create an array to hold the first character of each type (for reference only). 
    let firstCharacterOfType = []; 

    //Create an array to hold the subsequent characters of the same type that can be replaced if needed.
    let arrayOfCharatersThatCanBeReplaced = []; 

    //Create an array to hold the names of selected types that might be missing. 
    let typesNotFound = []; 
    
    //Go through all possible types that should be in the password.
    possibleTypes.forEach((thisType) => {

        //Keep track of whether the password currently contains this current type.
        let alreadyContainsType = false; 
        
        //For each character, see if it is the current type being searched for. 
        for(let thisCharacter = 0; thisCharacter < password.length; thisCharacter++) {
            //If it is the needed type, determine if it is the first or a subsequent (therefore unnecessary) character of that type.
            if(password[thisCharacter].type === thisType) {
                /*Store the character and its type if it is the first of its type.
                Store the character and its type if it is not the first of its type.
                When it is found, indicate that the password now contains this type.*/  
                if(alreadyContainsType === false) {
                    firstCharacterOfType.push({
                        character: password[thisCharacter].character,
                        type: password[thisCharacter].type
                    }); 
                    alreadyContainsType = true; 
                } else if(alreadyContainsType === true) { 
                    arrayOfCharatersThatCanBeReplaced.push({
                        position: thisCharacter,
                        character: password[thisCharacter].character,
                        type: password[thisCharacter].type
                    });
                }
            }

            //If we are at the end of the password, and the current type isn't found, save this type in an array to be used to replace.
            if(thisCharacter === password.length - 1 && alreadyContainsType === false) { 
                typesNotFound.push(thisType); 
            }
        }

    }); 

    //If there is at least one selected type not present in the password, run a function to replace those characters in the password.
    if(typesNotFound.length > 0) {
        password = replaceCharacters(password, possibleCharacters, typesNotFound, arrayOfCharatersThatCanBeReplaced); 
    }

    //Return the password.
    return password; 
    
}

function replaceCharacters(password, possibleCharacters, typesNotFound, arrayOfCharatersThatCanBeReplaced) { 
    //This function goes through each missing type to replace an unnecessary character with a needed character of the missing type.

    //Create an empty array of used indexes to avoid replacing indexes that are already replaced. 
    let usedIndexesReplaced = []; 
    let usedIndexesReplacer = []; 

    //Go through each type of character not found in the password, if any. 
    typesNotFound.forEach((thisType) => {

        //Populate a temporary array with just characters of this type. 
        let tempArrayOfPossibleCharacters = []; 

        possibleCharacters.forEach((thisChar) => {
            if(thisChar.type === thisType) {
                tempArrayOfPossibleCharacters.push(thisChar.character); 
            }
        }); 

        //Create a random index that will be used to access a random character that can be replaced.
        let randomIndexReplaced = Math.floor(Math.random() * arrayOfCharatersThatCanBeReplaced.length); 

        //Create a random index that will be used to access a random character to replace with. 
        let randomIndexReplacer = Math.floor(Math.random() * tempArrayOfPossibleCharacters.length); 
        
        //Make sure the index that will access a given spot in the password is not already used, if there is something in the usedIndexes array.
        if(usedIndexesReplaced.length > 0) {
            usedIndexesReplaced.forEach((thisIndex) => {
                while(randomIndexReplaced === thisIndex) {
                    randomIndexReplaced = Math.floor(Math.random() * arrayOfCharatersThatCanBeReplaced.length);
                }
            }); 
        }

        if(usedIndexesReplacer.length > 0) {
            usedIndexesReplacer.forEach((thisIndex) => {
                while(randomIndexReplacer === thisIndex) {
                    randomIndexReplacer = Math.floor(Math.random() * tempArrayOfPossibleCharacters.length); 
                }
            }); 
        }

        //Put these indexes into the arrays of already used indexes, so that they aren't replaced again.
        usedIndexesReplaced.push(randomIndexReplaced); 
        usedIndexesReplacer.push(randomIndexReplacer); 

        //Replace the selected character in the random position of the password with the new character of the needed type.
        password[arrayOfCharatersThatCanBeReplaced[randomIndexReplaced].position].character = tempArrayOfPossibleCharacters[randomIndexReplacer]; 

    }); 

    //Return the improved password with replaced characters.
    return password;

}


