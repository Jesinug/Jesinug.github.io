class Player {

  constructor(canvas, lives) {
    this.canvas = canvas; // main canvas, html element
    this.ctx = this.canvas.getContext("2d"); // way to interact with canvas
    this.lives = lives; // 
    this.width = 100;
    this.height = 80;


    this.x = this.canvas.width / 2 - this.width / 2; // player's position in X
    this.y = 800; //player's position in Y
    this.direction = 0; // player's direction
    this.speed = 7; // it's speed movement

    this.image = document.createElement('img')//new Image();
    this.image.src = "images/plant_state_0.png";
    /*this.plantImage1 = new Image();
    this.plantImage1.src = "images/plant_state_3 (1).png";
    this.plantImage2 = new Image();
    this.plantImage2.src = "images/plant_state_5.png";
    this.plantImage3 = new Image();
    this.plantImage3.src = "images/plant_state_8.png";*/
  }

  setDirection(direction) {
    if (direction === "right") {
      this.direction = 1;
    } else if (direction === "left") {
      this.direction = -1;
    } else if (!direction) {
      this.direction = 0;
    }
  }

  draw() {
    if(lives < 10) {
      //this.ctx.drawImage(this.image, this.x, this.y, this.width, this. height)
    //} else {
      //this.ctx.drawImage(this.plantImage2, this.x, this.y, this.width, this. height)
  }
  


  updatePosition() {
    this.x += this.direction * this.speed;
  }

  handleScreenCollision() {
    const screenLeftEdge = 0;
    const screenRightEdge = this.canvas.width;

    const playerLeftSide = this.x;
    const playerRightSide = this.x + this.width;

    if (playerLeftSide < screenLeftEdge) {
      this.x = 0;
    }

    if (playerRightSide > screenRightEdge) {
      this.x = screenRightEdge - this.width
    }
  }

  removeLife() {
    this.lives -= 1;
  }

  addLife() {
    this.lives += 1;

  }





  /* if (this.lives === 5) {
  print A
   } else if { ...
   } */



  didCollide(drop) {
    //seleccionamos los 4 laterales del jugador
    const plantLeft = this.x;
    const plantRight = this.x + this.width;
    const plantTop = this.y;
    const plantBottom = this.y + this.height;

    //seleccionamos los 4 laterales del enemigo
    const dropLeft = drop.x;
    const dropRight = drop.x + drop.size;
    const dropTop = drop.y;
    const dropBottom = drop.y + drop.size;

    //comprobamos si el enemigo ha entrado dentro del jugador por cualquiera de los 4 lados
    const crossLeft = dropLeft <= plantRight && dropLeft >= plantLeft; // mirar si dropLeft está entre plantRight y plantLeft
    const crossRight = dropRight >= plantLeft && dropRight <= plantRight; // mirar si dropRight está entre plantRight y plantLeft
    const crossBottom = dropBottom >= plantTop && dropBottom <= plantBottom; // mirar si dropBottom está entre plantTop y plantBottom
    const crossTop = dropTop <= plantBottom && dropTop >= plantTop; // mirar si dropTop está entre plantBottom y plantTop

    //solo cuando 1 condición de verticalidad y 1 de horizontalidad se cumplen, podemos considerar que nuestros
    //cuadrados han colisionado
    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false
    }

  }
}