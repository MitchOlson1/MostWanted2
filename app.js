"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      // console.log(searchResults);
      break;
    case 'no':
      // Here is where we want to ask single or multiple trait. Helper Function
    searchResults = searchBySingleTrait(people)
      // console.log(searchResults);
      break;
    // case 'multiple':
    //   searchResults = searchByMultipleTraits(people);
    //   // console.log(searchResults)
    //   break;
    // default: 
    //   // console.log(displayPeople())
          
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    console.log(displayPerson(person[0]))
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

function searchBySingleTrait(people){
  let searchType = promptFor("Do you know a trait of the person you are looking for?",yesNo).toLowerCase
  switch(searchType){
    case 'yes':
      let searchOption = promptFor(
        "Which trait would you like to search? (Input Number) /n" +
        "1. Gender /n" +
        "2. Eye Color /n" +
        "3. Height /n" +
        "4. Occupation /n",
        autoValid
      );
      let filteredSearch = people;

    searchOption.split(' ');
      if(searchOption.includes(1)){
        filteredSearch = searchByGender(filteredSearch)
      }
      if(searchOption.includes(2)){
        filteredSearch = searchByEyeColor(filteredSearch)
      } 
      if(searchOption.includes(3)){
        filteredSearch = searchByHeight(filteredSearch)
      } 
      if(searchOption.includes(4)){
        filteredSearch = searchByOccupation(filteredSearch)
      } 
      return displayPeople(filteredSearch)
  }

  }

function searchByMultipleTraits(people){
  let filteredSearch = people;

  let searchType = promptFor("Do you know the persons Gender? Enter 'Yes or 'No'",yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByGender(filteredSearch);
      console.log(filteredSearch);
    }

  searchType = promptFor("Do you know the persons Eye Color? Enter 'Yes or 'No'",yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByEyeColor(filteredSearch);
      console.log(filteredSearch);
    }
  
  searchType = promptFor("Do you know the persons Height? Enter 'Yes or 'No'",yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByHeight(filteredSearch);
      console.log(filteredSearch);
    }
  
  searchType = promptFor("Do you know the persons Occupation? Enter 'Yes or 'No'",yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByOccupation(filteredSearch);
      console.log(filteredSearch);
    }

  displayPeople(filteredSearch);
  return filteredSearch
  }
//TODO: add other trait filter functions here.
function searchByGender(people){
  let gender = promptFor("What is the persons gender?", autoValid);
  let searchedGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return searchedGender;
}


function searchByEyeColor(people){
  let eyeColor = promptFor("What is the persons Eyecolor?", autoValid);
  let searchedEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return searchedEyeColor;
}


function searchByHeight(people){
  let height = promptFor("What is the persons Height?", autoValid);
  let searchedHeight = people.filter(function(potentialMatch){
    if(potentialMatch.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  return searchedHeight;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the persons Occupation?", autoValid);
  let searchedOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return searchedOccupation;
}






//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "EyeColor: " + person.EyeColor + "\n";
  personInfo += "Height: " + person.Height + "\n";
  personInfo += "Occupation: " + person.Occupation + "\n";

  // TODO: finish getting the rest of the information to display.
  console.log(personInfo);
  return(personInfo)
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion