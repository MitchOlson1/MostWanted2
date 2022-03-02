"use strict"

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
    searchResults = searchByTraits(people)
      break;
    default:    
    app(people); 
      break;
  }
  
  mainMenu(searchResults, people);
}
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  switch(displayOption){
    case "info":
      displayPerson(person, people);
    break;
    case "family":
      displayFamily(person, people);
    break;
    case "descendants":
      dispayDescendants(person, people);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  let person;
  let personFoundArry = []
personFoundArry = people.filter(function (element){
  if (element.firstName.toLowerCase() === firstName.toLowerCase() && element.lastName.toLowerCase() === lastName.toLowerCase()){
    return true;
  }
});
person = personFoundArry.pop();
mainMenu(person, people)
}
function searchByTraits(people) {
  let listed = "";
  let filteredList;
  filteredList = searchByAge(people);
  filteredList = searchByHeight(filteredList);
  filteredList = searchByWeight(filteredList);
  filteredList = searchByOccupation(filteredList);
  filteredList = searchByEyeColor(filteredList);
  if (filteredList.length === 22) {
      alert("You said no to all filters, there is no one to display.");
  }
  else if (filteredList.length === 0) {
      alert("There is no one that meets your criteria.");
  }
  else {
      for (let i = 0; i < filteredList.length; i++) {
          listed += filteredList[i].firstName + " " + filteredList[i].lastName + ". ";
      }
      alert(listed);
  }
  app(people);
}

function searchByAge(people){
  let ageSearch = promptFor("Do you want to search by age? Enter yes or no.", yesNo).toLowerCase();
  switch (ageSearch){
    case "yes":
      let findAge = lookUpAge(people);
      return findAge;
    case "no":
      return people;
    default:
      searchByHeight(people);
      break;
  }
}
function searchByHeight(people){
  let heightSearch = promptFor("Do you want to search by height? Enter yes or no.", yesNo).toLowerCase();
  switch (heightSearch){
    case "yes":
      let findHeight = lookUpHeight(people);
      return findHeight;
    case "no":
      return people;
    default:
      searchByHeight(people);
      break;
  }
}
function searchByWeight(people){
  let weightSearch = promptFor("Do you want to search by weight? Enter yes or no.", yesNo).toLowerCase();
  switch (weightSearch){
    case "yes":
      let findWeight = lookUpWeight(people);
      return findWeight;
    case "no":
      return people;
    default:
      searchByWeight(people);
      break;
  }
}
function searchByOccupation(people){
  let occupationSearch = promptFor("Do you want to search by occupation? Enter yes or no.", yesNo).toLowerCase();
  switch (occupationSearch){
    case "yes":
      let findOccupation = lookUpOccupation(people);
      return findOccupation;
    case "no":
      return people;
    default:
      searchByOccupation(people);
      break;
  }
}
function searchByEyeColor(people){
  let eyeColorSearch = promptFor("Do you want to search by eye color? Enter yes or no.", yesNo).toLowerCase();
  switch (eyeColorSearch){
    case "yes":
      let findEyeColor = lookUpEyeColor(people);
      return findEyeColor;
    case "no":
      return people;
    default:
      searchByEyeColor(people);
      break;
  }
}
function lookUpHeight(people){
  let height = promptFor("What is the person's height?", autoValid)
  let heightFilteredArray = people.filter(function(element){
    if(element.height === height){
      return true;
    }
  });
  return heightFilteredArray;
}
function lookUpAge(people){
  let age = promptFor("What is the person's age?", autoValid)
  let ageFilteredArray = people.filter(function(element){
    if(element.age === age){
      return true;
    }
  });
  return ageFilteredArray;
}
function lookUpWeight(people){
  let weight = promptFor("What is the person's weight?", autoValid)
  let weightFilteredArray = people.filter(function(element){
    if(element.weight === weight){
      return true;
    }
  });
  return weightFilteredArray;
}
function lookUpOccupation(people){
  let occupation = promptFor("What is the person's Occupation?", autoValid)
  let occupationFilteredArray = people.filter(function(element){
    if(element.occupation === occupation){
      return true;
    }
  });
  return occupationFilteredArray;
}
function lookUpEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid)
  let eyeColorFilteredArray = people.filter(function(element){
    if(element.eyeColor === eyeColor){
      return true;
    }
  });
  return eyeColorFilteredArray;
}
function displayFamily(person, people) {
  let parents = getParents(person, people);
  let spouse = getSpouse(person, people);
  let siblings = getSiblings(person, people);
  let children = getChildren(person, people);
  let personFamily = "Parents: " + parents + "\n";
  personFamily += "Spouse: " + spouse + "\n";
  personFamily += "Siblings: " + siblings + "\n";
  personFamily += `Children: ${children}`;
  alert(personFamily);
  app(people);
}
function dispayDescendants(person, people){
  let descendants = findDescendants(person, people);
  if(descendants.length === 0){
    descendants = "Descendants not in data set."
  }
  alert(descendants);
  app(people);
  }
function findDescendants(person, people){
  let descendants = getDescendants(person, people)
  let descendantsToReturn = "";
  for(let i = 0; i < descendants.length; i++){
    descendantsToReturn += descendants[i].firstName + " " + descendants[i].lastName + ". ";
  if(i >= 0){
    let grandChildren = findDescendants(descendants[i], people);
    descendantsToReturn += grandChildren;
    }
  }
  return descendantsToReturn;
}
function getDescendants(person, people){
  let descendants = [];
  descendants = people.filter(function(element){
    if(element.parents.length === 0){
      return false;
    }
    else if(element.parents[0] === person.id || element.parents[1] === person.id){
      return true;
    }
  });
  return descendants;
}
function getChildren(person, people) {
  let children = [];
  let childrenToReturn = "";
  children = people.filter(function (element) {
      if (element.parents.length === 0) {
          return false;
      }
      else if (element.parents[0] === person.id || element.parents[1] === person.id) {
          return true;
      }
  });
  for (let i = 0; i < children.length; i++) {
      childrenToReturn += children[i].firstName + " " + children[i].lastName + ". ";
  }
  if (children.length === 0) {
      childrenToReturn = "Children not in data set.";
  }
  return childrenToReturn;
}
function getSiblings(person, people) {
  let siblings = [];
  let siblingsToReturn = "";

  if (person.parents.length === 0) {
      return "Siblings not in data set.";
  }
  else {
      siblings = people.filter(function (element) {
          if (element.parents.length === 0) {
              return false;
          }
          else if (element === person) {
              return false;
          }
          else if (element.parents[0] === person.parents[0] || element.parents[0] === person.parents[1]) {
              return true;
          }
          else if (element.parents[1] === person.parents[0] || element.parents[1] === person.parents[1]) {
              return true;
          }
      });
  }

  for (let i = 0; i < siblings.length; i++) {
      siblingsToReturn += siblings[i].firstName + " " + siblings[i].lastName + ". ";
  }

  return siblingsToReturn;
}

function getParents(person, people) {
  let parents = [];
  let parentsToReturn = "";

  if (person.parents.length === 0) {
      return "Parents not in data set.";
  }
  else {
      parents = people.filter(function (element) {
          if (element.id === person.parents[0] || element.id === person.parents[1]) {
              return true;
          }
      });
  }
  for (let i = 0; i < parents.length; i++) {
      parentsToReturn += parents[i].firstName + ". " + parents[i].lastName + ". ";
  }
  return parentsToReturn;
}
function getSpouse(person, people) {
  let spouse;
  let spouseArray = [];
  let spouseToReturn;
  if (person.currentSpouse === null) {
      return "Spouse not in data set.";
  }
  else {
      spouseArray = people.filter(function (element) {
          if (element.id === person.currentSpouse) {
              return true;
          }
      });
  }
  spouse = spouseArray.pop();
  spouseToReturn = spouse.firstName + " " + spouse.lastName;
  return spouseToReturn;
}
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person, people) {

  let parent = getParents(person, people);
  let spouse = getSpouse(person, people);

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + parent + "\n";
  personInfo += "Spouse: " + spouse;

  alert(personInfo);
  app(people);
}
function promptFor(question, valid){
  let isValid;
  do{
    let response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}
function autoValid(input){
  return true; 
}
function customValidation(input){
  
}

