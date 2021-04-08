//A.. DECLARING MAIN VARIABLES TO KEEP THE DOM BUILDER AND EVERY SCREEN

let game;
let splashScreen;
let gameScreen;
let gameOverScreen;


//.B BUILDING THE DOM BUILDER TO USE IN EVERY MAIN CREATE/REMOVE SCREEN FUNCTION
//-----------------------------|        |---------------------//
/**/                                                        /**/
/**/function buildDom(htmlString) {                         /**/
/**/  const tempDiv = document.createElement("div");        /**/
/**/  tempDiv.innerHTML = htmlString;                       /**/
/**/  return tempDiv.children[0];                           /**/
/**/}                                                       /**/
//--------------" mini DOM building machine "-----------------//



//----- Function createSplashScreen
function createSplashScreen() {
  splashScreen = buildDom(`
      <main class="splash">
      <h1 id = "gameName">B L O O M</h1>
      <p>Don't trust everything that falls from the sky...<br>
      Help Planty survive the strangest rain in history.</p>
        <button><str>PLAY</str></button>
      </main>
    `);
  document.body.appendChild(splashScreen);
  document.body.classList.add("splash-background")

  const startButton = splashScreen.querySelector("button");
  startButton.addEventListener("click", startGame);
  console.log("function createSplashScreen OK")
}


//----- Function removeSplashScreen
function removeSplashScreen() {
  splashScreen.remove();
  document.body.classList.remove("splash-background")
  console.log("function removeSplashScreen OK")
}

//----- Function createGameScreen
function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game container">
        <header>
            <div class="lives">
                <span class="label">Lives:</span>
                <span class="value"></span>
            </div>
            <div class="score">
                <span class="label">Score:</span>
                <span class="value"></span>
            </div>
        </header>
        <div class="canvas-container">
            <canvas></canvas>
        </div>
        <footer></footer>
    </main>
    `);

 

  document.body.appendChild(gameScreen);
  const canv = document.querySelector(".canvas-container");
  console.log("function createGameScreen OK")
}

//----- Function removeGameScreen
function removeGameScreen() {
  gameScreen.remove();
  console.log("function removeGameScreen OK")
}

//----- Function createGameOverScreen
function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
    <main class = "splash">
        <h1>GAME OVER</h1>
        <p>Your score: <span>${score}</span> </p>
        <button>Restart</button>
    </main>
    `);
    const button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame)
    document.body.appendChild(gameOverScreen)
    console.log("function createGameOverScreen OK")
}


//----- Function removeGameOverScreen
function removeGameOverScreen() {
    gameOverScreen.remove()
    console.log("function removeGameOverScreen OK")
  }


//----- Function startGame (two scenarios)
function startGame() { 
  removeSplashScreen();
  if(gameOverScreen){
      removeGameOverScreen();
  }
  createGameScreen();
  game = new Game(gameScreen);
  game.start();
  console.log("function startGame OK")
}

//----- Function endGame
function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
  console.log("function endGame OK")
}

//BUT FIRST... Wait till everything is loaded to start

window.addEventListener("load", createSplashScreen);