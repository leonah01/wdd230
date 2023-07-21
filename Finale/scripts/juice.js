const requestURL = 'data.json';
const drinkNutritionTable = document.querySelector("#drink-nutrition-table-id");
const drinkTable = document.querySelector("#drink-list-table-id");
const drinkTableScrollableDiv = document.querySelector("#drink-list-inner-div");
const drinkTableSelected = document.querySelector(".selected");
const drinkForm = document.querySelector("#drink-form");
const drinkFormReset = document.querySelector("#drink-form-reset");

const fruit1 = document.querySelector("#fruit-1");
const fruit2 = document.querySelector("#fruit-2");
const fruit3 = document.querySelector("#fruit-3");

const fruitNames = 1;
const carbohydrates = 2;
const fat = 3;
const protein = 4;
const sugar = 5;
const calories = 6;
const grams = 7;
const specialInstructions = 8;
const date = 9;
const email = 10;
const cellPhone = 11;
const userName = 12;

let fruits = null;

fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    fruits = jsonObject;
    fruits.forEach(loadFruitData);
});

function loadFruitData (fruit) {
    let newFruit1 = document.createElement('option');
    let newFruit2 = document.createElement('option');
    let newFruit3 = document.createElement('option');
    newFruit1.innerText = fruit.name;
    newFruit2.innerText = fruit.name;
    newFruit3.innerText = fruit.name;

    if (fruit1) {
      fruit1.appendChild(newFruit1);
    }
    if (fruit2) {
      fruit2.appendChild(newFruit2);
    }
    if (fruit3) {
      fruit3.appendChild(newFruit3);
    }
}


//Create button event
const calculateDrinkButton = document.querySelector("#get-drink-info-button");
if (calculateDrinkButton) {
  calculateDrinkButton.onclick = function() {
    CalculateDrink();
  };
} else {
  console.log('Error: Calculate Drink Button element not found.');
}

const clearFormButton = document.querySelector("#clear-form-button");
if (clearFormButton) {
  clearFormButton.onclick = function() {
    clearForm();
  };
} else {
  console.log('Error: Clear Form Button element not found.');
}
function CalculateDrink() {

    if (isFormValid()) {

        // carbohydrates, protein, fat, sugar, and calories , names
        const drink_selection = [];
        drink_selection[date] = new Date(date).toLocaleString();
        drink_selection[fruitNames] = "";
        drink_selection[carbohydrates] = 0;
        drink_selection[protein] = 0;
        drink_selection[fat] = 0;
        drink_selection[sugar] = 0;
        drink_selection[calories] = 0;
        drink_selection[grams] = 0;
        drink_selection[userName] = document.querySelector("#user-name").value;
        drink_selection[email] = document.querySelector("#email").value;
        drink_selection[cellPhone] = document.querySelector("#cell-phone").value;
        drink_selection[specialInstructions] = document.querySelector("#special-instructions").value;
        const fruitSelectionList = [fruit1,fruit2, fruit3];
        fruitSelectionList.forEach((item) => {

            if (item.selectedIndex != 0) {
                const currentFruit = fruits[item.selectedIndex - 1];
                const currentCarbs = currentFruit.nutritions.carbohydrates;
                const currentProtein = currentFruit.nutritions.protein;
                const currentFat = currentFruit.nutritions.fat;
                const currentSugar = currentFruit.nutritions.sugar;
                const currentCalories = currentFruit.nutritions.calories;
                
                drink_selection[fruitNames] += currentFruit.name + " ";
                drink_selection[carbohydrates] += (currentCarbs);
                drink_selection[protein] += (currentProtein);
                drink_selection[fat] += (currentFat);
                drink_selection[sugar] += (currentSugar);
                drink_selection[calories] += (currentCalories);
             

            }
        })
        // Make nutrients two decimal points
        drink_selection[carbohydrates] = (drink_selection[carbohydrates] ).toFixed(2);
        drink_selection[protein] = (drink_selection[protein]).toFixed(2);
        drink_selection[fat] = (drink_selection[fat] ).toFixed(2);
        drink_selection[sugar] = (drink_selection[sugar]).toFixed(2);
        drink_selection[calories] = (drink_selection[calories]).toFixed(2);

        //add item to local storage 
        let drinkList = localStorage.drinkList;
        if (drinkList != null) {
            drinkList = JSON.parse(drinkList);
            drinkList.push(drink_selection);
        }
        else {
            drinkList = [drink_selection];
        }
        
        localStorage.drinkList = JSON.stringify(drinkList);
        localStorage.numDrinks = drinkList.length;

        loadDrinkTable();

        //select the last row in the drink table.
        drinkTable.lastChild.click();

        // bring the latest drink into view
        drinkTableScrollableDiv.scrollTo(0,drinkTable.scrollHeight);

             
       
    }
}

function isFormValid() {


    if (fruit1.selectedIndex != 0) {
                return true;
    } else {
        return false;
    }
}

function loadDrinkTable() {
    let drinkList = [];
  
    // get the drink data
    const drinkObject = localStorage.drinkList 
    if (drinkObject != null) {
        drinkList = JSON.parse(localStorage.drinkList);
    }
  
    // check if drinkTable exists
    if (drinkTable !== null) {
      // walk each row and create the table
      drinkList.forEach((drink, index) => {
        let drinkRow = document.createElement('tr');
  
        drinkRow.addEventListener("click", function () {
          const rowNumber = parseInt(this.children[0].innerText);
          this.classList.add("selected")
          getSiblings(this).forEach((item) => {
            item.classList.remove("selected");
          });
  
          loadNutritionData(rowNumber);
          console.log(rowNumber);
        })
  
        let drinkNumber = document.createElement('td');
        drinkNumber.innerHTML = "<p>" + (index + 1) + "</p>";
  
        let drinkName = document.createElement('td');
        drinkName.innerHTML= "<p>" + drink[fruitNames] + "</p>";
  
        drinkRow.appendChild(drinkNumber);
        drinkRow.appendChild(drinkName);
  
        // check if drinkTable exists before appending child elements
        if (drinkTable !== null) {
          drinkTable.appendChild(drinkRow);
        }
      })
    }
  }
  

function loadNutritionData(value) {

    //get the current drink
    let drinkList = JSON.parse(localStorage.drinkList);
    const drink = drinkList[value - 1]

  

    drinkDate = new Date(parseInt(drink[date])).toDateString();

    //walk the current drink selection, add data to the table.
    document.querySelector("#drink-user-name-cell-id").innerHTML = "<p>" + drink[userName] + "</p>";
    document.querySelector("#drink-user-email-cell-id").innerHTML = "<p>" + drink[email] + "</p>";
    document.querySelector("#drink-user-phone-cell-id").innerHTML = "<p>" + drink[cellPhone] + "<p>";
    document.querySelector("#drink-special-instructions-cell-id").innerHTML = "<p>" + drink[specialInstructions] + "</p>";
    document.querySelector("#drink-fruit-names-cell-id").innerHTML = "<p>" + drink[fruitNames]+ "</p>";
    document.querySelector("#drink-carbs-cell-id").innerHTML = "<p>" + drink[carbohydrates] + "</p>";
    document.querySelector("#drink-protein-cell-id").innerHTML = "<p>" + drink[protein] + "</p>";
    document.querySelector("#drink-fat-cell-id").innerHTML = "<p>" + drink[fat] + "</p>";
    document.querySelector("#drink-sugar-cell-id").innerHTML = "<p>" + drink[sugar] + "</p>";
    document.querySelector("#drink-calories-cell-id").innerHTML = "<p>" + drink[calories] + "</p>";
    document.querySelector("#drink-date-cell-id").innerHTML = "<p>" + drinkDate +"<p>";

}
   

let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};
 
loadDrinkTable();