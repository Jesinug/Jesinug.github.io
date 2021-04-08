class Drop {
  
  constructor(canvas, positionX, type) {
    this.type = type;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 10;
    this.height = 25;
    this.x = positionX;
    this.y = 0
    this.speed = 5;
  }

  draw() {
    const imgSrc = {
      enemy: "images/orangeDrop.png",
      friend: "images/blueDrop.png"
    }
    const img = document.createElement("img");
    img.src = imgSrc[this.type]
    this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  updatePosition() {
    this.y += this.speed
  }

  isInsideScreen() {
    const dropTop = this.y;
    const screenBottomEdge = this.canvas.height;
    const isInside = screenBottomEdge > dropTop;
    return isInside;
  }


}