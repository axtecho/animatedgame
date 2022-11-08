window.addEventListener("load", start);

let lives;
let bgimg = "hbg" + lives;

let delightometer;
let dimg = "dbg" + delightometer;

let gameTime = 30;
let timeLeft;
let bgmusic = document.querySelector("#backgroundmusic");




function start() {
  console.log("startscreen")

  document.querySelector("#game").classList.remove("hidden");
  document.querySelector("#title_screen").classList.remove("hidden");

  document.querySelector("#see_instructions").addEventListener("click", gameInstructions);
  document.querySelector("#play_game").addEventListener("click", startGame);
  document.querySelector("#instructions>p").addEventListener("click", startGame)
  document.querySelector("#level_complete>p").addEventListener("click", startGame);
  document.querySelector("#game_over>p").addEventListener("click", startGame);
}

function startGame() {
  console.log("start");


  lives = 3;
  timeLeft = gameTime + 1;
  delightometer = 50;

  /* document.querySelector("#health").classList.add(bgimg); */

  hideScreens();


  let rndMov = generateRandomNumber(4);
  document.querySelector("#mute").classList.add("m_on");
  document.querySelector("#score_board").classList.add("dbg50");
  document.querySelector("#health").classList.add("hbg3");
  document.querySelector("#time").classList.add("tbg30");

  //Soap-bar
  document.querySelector("#sb_container").classList.add("movement1");
  document.querySelector("#sb_container").classList.add("position4");
  document.querySelector("#sb_container").addEventListener("click", clickGoodElement);
  //Toaster
  document.querySelector("#t_container").classList.add("movement2");
  document.querySelector("#t_container").classList.add("position1");
  document.querySelector("#t_container").addEventListener("click", clickBadElement);

  //Hairdryer
  document.querySelector("#h_container").classList.add("movement3");
  document.querySelector("#h_container").classList.add("position3");
  document.querySelector("#h_container").addEventListener("click", clickBadElement);
  //Duck
  document.querySelector("#d_container").classList.add("movement4");
  document.querySelector("#d_container").classList.add("position4")
  document.querySelector("#d_container").addEventListener("click", clickGoodElement);
  //Show time


  playbgmusic();
  bgmusic.addEventListener("ended", playbgmusic);
  document.querySelector("#mute").addEventListener("click", muteMusic);

  showTime();
}

function muteMusic() {
  console.log("muteMusic")
  if (bgmusic.paused != true) {

  if (bgmusic.muted === true) {
      bgmusic.muted = false;
      document.querySelector("#mute").classList = "";
      document.querySelector("#mute").classList.add("m_on");

  } else {
    bgmusic.muted = true; 
   
    document.querySelector("#mute").classList = "";
    document.querySelector("#mute").classList.add("m_off");
  }
  }
}

// When bad elements end cycle a life is taken
document.querySelector("#t_container").addEventListener("animationiteration", retractLife);
document.querySelector("#h_container").addEventListener("animationiteration", retractLife);

//When goog elements end cycle delight is added
document.querySelector("#sb_container").addEventListener("animationiteration", addDelight);
document.querySelector("#d_container").addEventListener("animationiteration", addDelight);

function playbgmusic() {
  console.log("bgmusic");
  bgmusic.play();
}

function stopAllSounds() {
  bgmusic.pause();
  bgmusic.currentTime;
}

function gameInstructions() {

  document.querySelector("#title_screen").classList.add("hidden");
  document.querySelector("#instructions").classList.remove("hidden");
}

function showTime() {
  console.log("showTime");

  timeLeft--;


  let ta = "tbg" + timeLeft;
  document.querySelector("#time").classList = "";
  document.querySelector("#time").classList.add(ta);

  startTime();
}



function startTime() {
  console.log("startTime");
  console.log(timeLeft);
  if (timeLeft > 0) {
    setTimeout(showTime, 1000);
  } else {
    gameOver();
  }
}


function clickBadElement() {
  console.log("clickBadElement")
  //console.log(this);
  //this = t_container
  this.classList.add("pause");
  this.firstElementChild.classList.add("rotateL");
  this.firstElementChild.addEventListener("animationend", restartBadElement);
}





function clickGoodElement() {
  console.log("clickGoodElement")

  this.removeEventListener("click", clickGoodElement);
  this.classList.add("pause");
  this.firstElementChild.classList.add("rotateL");
  this.firstElementChild.addEventListener("animationend", restartGoodElement);
  retractDelight();


  if ((delightometer <= 0)) {
    gameOver();
  }


}

function addDelight() {
  delightometer = delightometer + 10;
  console.log("addDelight");
  let dimg = "dbg" + delightometer;

  console.log("dbg" + delightometer);
  document.querySelector("#score_board").classList = "";
  document.querySelector("#score_board").classList.add(dimg);

  if ((delightometer === 100)) {
    gameOver();
  }
}

function retractDelight() {
  delightometer = delightometer - 10;
  console.log("retractDelight");
  let dimg = "dbg" + delightometer;

  console.log("dbg" + delightometer);
  document.querySelector("#score_board").classList = "";
  document.querySelector("#score_board").classList.add(dimg);
  if ((delightometer <= 0)) {
    gameOver();
  }
}

function retractLife() {
  lives = lives - 1;
  console.log("retractLife");
  let bgimg = "hbg" + lives;

  console.log(bgimg);
  document.querySelector("#health").classList = "";
  document.querySelector("#health").classList.add(bgimg);

  if ((lives <= 0)) {
    gameOver();
  }

}





function restartBadElement() {
  console.log("restartBadElement")
  this.parentElement.classList = "";
  this.classList = "";

  this.parentElement.offsetHeight;


  let rndMov = generateRandomNumber(4);
  let rndPos = generateRandomNumber(6);
  this.parentElement.classList.add("position" + rndPos);
  this.parentElement.classList.add("movement" + rndMov);


}


function restartGoodElement() {
  console.log("restartGoodElement")

  this.parentElement.classList = "";
  this.classList = "";

  this.parentElement.offsetHeight;


  let rndMov = generateRandomNumber(4);
  let rndPos = generateRandomNumber(6);

  this.parentElement.classList.add("position" + rndPos);
  this.parentElement.classList.add("movement" + rndMov);
  this.parentElement.addEventListener("click", clickGoodElement);
}





function generateRandomNumber(number) {
  //console.log("generateRandoNumber");
  return Math.floor(Math.random() * number) + 1;

}



function gameOver() {
  console.log("gameOver")

  stopAllSounds();
  document.querySelector("#h_container").classList.value = "";
  document.querySelector("#t_container").classList.value = "";
  document.querySelector("#d_container").classList.value = "";
  document.querySelector("#sb_container").classList.value = "";



  document.querySelector("#h_container").removeEventListener("click", clickBadElement);
  document.querySelector("#t_container").removeEventListener("click", clickBadElement);
  document.querySelector("#d_container").removeEventListener("click", clickGoodElement);
  document.querySelector("#sb_container").removeEventListener("click", clickGoodElement);

  document.querySelector("#h_sprite").removeEventListener("animationend", restartBadElement)
  document.querySelector("#t_sprite").removeEventListener("animationend", restartBadElement)
  document.querySelector("#d_sprite").removeEventListener("animationend", restartGoodElement)
  document.querySelector("#sb_sprite").removeEventListener("animationend", restartGoodElement)


  if ((lives <= 0) || (delightometer <= 0)) {
    document.querySelector("#game_over").classList.remove("hidden");
    document.querySelector("#game_over>p").addEventListener("click", start);
  } else {
    document.querySelector("#level_complete").classList.remove("hidden");
    document.querySelector("#level_complete>p").addEventListener("click", start);

  }

}

function hideScreens() {
  console.log("screenshidden")
  document.querySelector("#title_screen").classList.add("hidden");
  document.querySelector("#instructions").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
}