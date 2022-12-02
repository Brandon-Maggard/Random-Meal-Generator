"use strict";

//setting variables for the dark mode toggle
const toggleButton = document.getElementById("toggleButton");
const theme = document.getElementById("wrapper");
let darkMode = localStorage.getItem("darkMode");

//adding the class dark mode so that the CSS will change it to dark mode and save it to local storage
const enableDarkMode = () => {
  theme.classList.add("darkModeTheme");
  toggleButton.classList.remove("darkToggle");
  localStorage.setItem("darkMode", "enabled");
};

//removing the dark mode class so that it goes back to the orginal state and save it to local storage
const disableDarkMode = () => {
  theme.classList.remove("darkModeTheme");
  toggleButton.classList.add("darkToggle");
  localStorage.setItem("darkMode", "disabled");
};

//determineing if dark mode is enableed
if (darkMode === "enabled") {
  enableDarkMode(); 
}

//allows the person to click the button and for the the above code to either disable or enable the dark mode
toggleButton.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode"); 
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});


//The different sections of the page that the API will send information to for display
const getMeal = $("#mButton");

//Calling the ajax on click ("#mButton").click 
function  loadMeals(){

  const general = $("#general");
  const ingred = $("#ingred");
  const direct = $("#direct");


	// ajax call to the api and how we want the data
	$.ajax({
		// set the url and the type of response we expect from the API
		url: `https://www.themealdb.com/api/json/v1/1/random.php`,
		dataType: "json"
		
		// if it works this is how we want to handle the JSON data we get back
	}).done(function(meals){
    console.log(meals);
		// an empty string to build my output for the #general section
		let htmlGen = "";
		
		//this get the meal name, image, category and tags and fills the string
		
		htmlGen += `<h3>${meals.meals[0].strMeal}</h3>
    <img src="${meals.meals[0].strMealThumb}" alt="Picture of the random generated meal">
    <p><strong>Orgin: </strong>${meals.meals[0].strArea}</p>
    <p><strong>Category: </strong>${meals.meals[0].strCategory}</p>
    <p><strong>Tags: </strong>${meals.meals[0].strTags}</p>`; 
		
		// add the HTML string to the page
    general.html(htmlGen);

    // an empty string to build my output for the #ingred section
    let htmlIngred = "";
		
		let ingredients = [];
	  // Using a for loop to get all the ingredients for the meal that was pulled randomly
    for(let i=1; i<=20; i++) {
      if(meals.meals[0][`strIngredient${i}`]) {
        ingredients.push(`${meals.meals[0][`strIngredient${i}`]} - ${meals.meals[0][`strMeasure${i}`]}`)
      } else {
        // Stops the loop
        break;
      }
    }
		
    // this adds the indgredients to the string
		htmlIngred += `<h4>Ingredients:</h4>
    <ul>
      ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>`; 
		
		// add the HTML string to the page
    ingred.html(htmlIngred);

    // an empty string to build my output for the #direct section
    let htmlDirect = "";
		
		//add the instructions to the string
		
		htmlDirect += `<h4>Directions</h4>
    <p>${meals.meals[0].strInstructions}</p>`; 
		
		// add the HTML string to the page
    direct.html(htmlDirect);

    $("#accordion").accordion();
		
	}).fail(function(jqXHR){
		//displays and error to the page and to the console
	general.html("There was a problem with the random meal database!");
		console.error(jqXHR.responseJSON.status_message);
	});		
};

//endables the meal to generation on the click on the meal generation button
$(document).ready(function(){
  const general = $("#general");
  const ingred = $("#ingred");
  const direct = $("#direct");

  $("#mButton").click(loadMeals);
});
