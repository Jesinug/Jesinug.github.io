class Game {
  constructor(gameScreen) {
    this.canvas = null;
    this.ctx = null;
    this.drops = [];
    this.player = null;
    this.gameScreen = gameScreen;
    this.score = 0;
    this.livesElement = undefined;
    this.scoreElement = undefined;

    this.gameIsOver = false;
  }

  start() {
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d"); 
    
    this.canvasContainer = this.gameScreen.querySelector(".canvas-container");
    this.containerWidth = this.canvasContainer.clientWidth;
    this.containerHeight = this.canvasContainer.clientHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(this.canvas, 5, "images/plant_state_0.png");

    function handleKeyDown(event) {
      if (event.keyCode === 39) {
        this.player.setDirection("right");
      } else if (event.keyCode === 37) {
        this.player.setDirection("left");
      }
    }

    function handleKeyUp(event) {
      this.player.setDirection();
    }
    
    const boundHandleKeyDown = handleKeyDown.bind(this);
    const boundHandleKeyUp = handleKeyUp.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);
    document.body.addEventListener("keyup", boundHandleKeyUp);

    this.startLoop();
  }



  startLoop() {
    
    const loop = () => {
      if (this.drops.length < 20) {
        if (Math.random() > 0.95) {
          const randomType = ['friend', 'enemy'][Math.floor(Math.random() * 2)];
          const randomX = Math.floor((this.canvas.width - 20) * Math.random());
          const newDrop = new Drop(this.canvas, randomX, randomType);
          this.drops.push(newDrop);
        }
      }

      this.checkCollisions();
      this.player.updatePosition();
      this.player.handleScreenCollision();

      this.drops = this.drops.filter((enemy) => {
        enemy.updatePosition();
        return enemy.isInsideScreen();
      });

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.player.draw();

      this.drops.forEach((enemy) => {
        enemy.draw();
      });

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      this.updateGameStats();
    };
    loop();
  }

  checkCollisions() {
    this.drops.forEach((enemy) => {
      if (this.player.didCollide(enemy)) {
      
      if (enemy.type === 'enemy') { 
        this.player.removeLife(); 
      } else {
        this.player.addLife();
      }



        enemy.y = this.canvas.height;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    });
  }

  gameOver() {
    this.gameIsOver = true;
    endGame(this.score);
  }
  
  updateGameStats() {
    this.score += 10;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
  }
}