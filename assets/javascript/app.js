
$(document).ready(function(){
// Here is the array that holds the game options
	var topics = ["GTA V","Overwatch","Battlegrounds","Fortnite","Warhammer","Skyrim","Fallout 4","Dark Souls 3"];

	var main = $("body");

// My API Key: 8nqLMD0F9BnxI0PaAWou0BVANT4fVP4Y
	
	var btns = main.find('#buttons');
	
	// Grabbing the main div on the page (#game-options)
	var gameDiv = $("#game-options");

	// Funcion for Getting text from the #game-form to add to the topic array.

// FIRST TASK - CREATE BUTTONS
	//
	// Using a for loop to iterate through the array.
	// and perform a function with each loop
	for (var i = 0; i < topics.length; i++) {

		// Create a new variable "gameButton" equal to <button> 
		var gameButton = $("<button>"); 

		// Assign classes to each "gameButton"  		
		gameButton.addClass("game-button game");

		// Assign data-attibutes to each "gameButton"
		// Attribute is "data-game" equal to topic[i]
		gameButton.attr("data-game", topics[i]);

		// Place the text from topics[i] and place it into the gameButton
		gameButton.text(topics[i]);

		// Add the new button to the main div
		btns.append(gameButton);

	};


// SECOND TASK - ADD CLICK EVENTS TO BUTTONS
// THEN ASSIGNING SEPARATE QUERY URLS TO EACH
// BY LOOPING THROUGH THE RESULTS ARRAY
	//
	// Attach an 'on-click' event attached to the .game-button class
	btns.on("click", ".game-button", function () {

		// Empty the div of any previous content
		$("#display").empty();
		// Creating the search keyword
		var game = $(this).attr("data-game");
	
		// Adding the Giphy_API combined with the game keyword
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=8nqLMD0F9BnxI0PaAWou0BVANT4fVP4Y&limit=10&offset=0&rating=PG&lang=en";
	   

		// AJAX Get request
		$.ajax({
			url: queryURL,
			method: "GET"
		})

		// Function to get response data from the API
		.then(function(response) {
			//Storing the results in a variable
			var results = response.data;
			console.log(results);
		// Loop through the response.data array
			for (var i = 0; i < results.length; i++) {
				console.log(results[i]);
				// Check rating and take action if matches
				if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
					// Creating a div for gifs with the class of "item"
					var gifDiv = $("<div class='item'>");

					// Storing the rating
					var rating = results[i].rating;

					// Creating a place for the rating to be displayed and an img tag
					var p = $("<p>").text("Rating: " + rating);

					var gameGif = $("<img>");
				
					// Adding the 'gif' class to use for Pausing later
					// Then giving the img tag an src attribute based off results[i]
					gameGif.attr("src", results[i].images.fixed_height.url);
					// Appending the rating paragraph and the gif div inside of the 'gifDiv'
					gameGif.attr("data-still", results[i].images.fixed_height_still.url);
					gameGif.attr("data-animate", results[i].images.fixed_height.url);

					gifDiv.append(p);
					gifDiv.append(gameGif);
				
					$("#display").prepend(gifDiv);
	
					$(gameGif).on("click", function() {
			
						var state = $(this).attr("data-state");
      	
						if (state === "still") {
	
							$(this).attr("src", $(this).attr("data-animate"));
				
							$(this).attr("data-state", "animate");
		
						} else {
			
							$(this).attr("src", $(this).attr("data-still"));
        
							$(this).attr("data-state", "still");
      
						}
    
					});

				}
			}
		});
	});

// THIRD TASK - ADD SEARCH + ADD BUTTON FUNCTION 

// I COULDN'T GET THIS PART TO WORK CORRECTLY, SO I'M COMMENTING IT OUT FOR NOW. 
	
/*	function displayGameInfo() {
		var game = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=8nqLMD0F9BnxI0PaAWou0BVANT4fVP4Y&limit=10&offset=0&rating=PG&lang=en";
	  	
		$.ajax({
          		url: queryURL,
          		method: "GET"
        		}).then(function(response) {

	});
	}

	function renderButtons() {
		//$("#buttons").empty()
		for (var i = 0; i < topics.length; i++) {
			var a = $("<button>");
			a.addClass("game");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#buttons").append(a);
		};
	};
	// This function handles events where the add movie button is clicked
      
	$("#add-game").on("click", function(event) {
        
		event.preventDefault();
        
		// This line of code will grab the input from the textbox
        
		var game = $("#game-input").val().trim();

		// The movie from the textbox is then added to our array
        
		topics.push(game);

		// Calling renderButtons which handles the processing of our movie array
       
		renderButtons();
      
	});
     
	// Adding click event listeners to all elements with a class of "movie"
      
	$(document).on("click", ".game", displayGameInfo);

	// Calling the renderButtons function to display the intial buttons
      renderButtons();
*/

});


