  var simonSequence = []; // Stores sequence that must be played in order to win
  var successCounter = 0; // Counter for determining position in simonSequence array.
  var play_timer = 0; // In order to make setTimeout for audio.play() cumulative.
  var colors_clicked = 0; // Trying to solve issues with SetTimeout

  // Add event listener using jQuery
  $(document).on("keypress", keyPressed);

  // CallBack function that receives event generated by keypress and does something with it
  // It also sets a boolean variable to avoid starting new games until game ends
  function keyPressed(keyThatWasPressed) {
    if (keyThatWasPressed.key.toLowerCase() === "a") {
      $(document).off("keypress");
      gameStart();
    }
  }

  // GameStart - READY?
  function gameStart() {
    $("body").removeClass("game-over");
    simonSequence = [];
    successCounter = 0;
    play_timer = 0;
    colors_clicked = 0;
    $("#level-title").text("READY?");
    setTimeout(gameLoop, 1000);
  }

  // GameLoop is used until game ends, waits for mouseclick to do things.
  function gameLoop() {
    // H1 text modification on gameStart
    $("#level-title").text("LEVEL " + (successCounter + 1));

    // Adds first number on the sequence and waits for mouseclick
    simonSequence.push(nextSequence());
    console.log(simonSequence);
    playSequence();
    //$(".btn").on("click", amIBeingClicked);
  }

  // Checks if buttons were clicked and plays sound
  function amIBeingClicked(color, play) {
    if (colors_clicked === simonSequence.length - 1) {
      $(".btn").off("click");
    }
    console.log("amIBeingClicked --> successCounter: " + successCounter);
    if (play === true) {
      targetClicked = document.querySelector("." + color);
    } else {
      colors_clicked++;
      color = event.toElement.id;
      var targetClicked = event.target;
    }


    // Check if any color has been clicked and adds animation and sound
    if ((color === "red") || (color === "green") || (color === "yellow") || (color === "blue")) {
      var typeOfClick;
      if (play === true) {
        $(targetClicked).animate({
          opacity: 0.5,
        }, 100).animate({
          opacity: 1
        }, 100);
      } else {
        $(targetClicked).addClass("pressed");
        setTimeout(function() {
          $(targetClicked).removeClass("pressed");
        }, 100);
      }
      var audio = new Audio("sounds/" + color + ".mp3");
      if (play === true) {
        audio.play();
      } else {
        audio.play();
        veryfySimonSecuence(color);
      }
    }
  }


  function veryfySimonSecuence(color) {
    if (color === simonSequence[successCounter]) {
      successCounter++;
      if (successCounter === simonSequence.length) {
        $("#level-title").text("LEVEL " + (successCounter + 1));
        play_timer = 0;
        colors_clicked = 0;
        simonSequence.push(nextSequence());
        console.log(simonSequence);
        successCounter = 0;
        playSequence();
      }

    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $(".btn").off("click");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);
      $("#level-title").text("GAME OVER, press A key to restart.");
      $(document).on("keypress", keyPressed);
    }
  }

  function playSequence() {
    console.log("Playing simonSequence: " + simonSequence);
    $(".btn").off("click");
    var tmp_i = []
    for (i = 0; i < simonSequence.length; i++) {
      tmp_i.push(i);
      setTimeout(function() {
        amIBeingClicked(simonSequence[tmp_i.shift()], true);
        setTimeout(function() {
          play_timer -= 500;
        }, 500);
      }, play_timer += 500);
    }
    setTimeout(function() {
      $(".btn").on("click", amIBeingClicked);
    }, play_timer);
  }

  function nextSequence() {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return "green";
        break;
      case 1:
        return "red";
        break;
      case 2:
        return "yellow";
        break;
      case 3:
        return "blue";
        break;
      default:
    }
  }
