class Bug {
  constructor(x, y, lineLength, context) {
    this.lineLength = lineLength;
    this.localCanvasContext = context;
    this.fillColor = "#8ED6FF";
    this.strokeColor = "#FFFFFF";
    this.size = 50;

    //randomize speed
    this.speedX  =(Math.random()*5);
    this.speedY  =(Math.random()*5);;
    this.setPoints(x, y);
  }
  //method to display the triangle using the HTML 5 canvas API
  display() {
    this.localCanvasContext.fillStyle = this.fillColor;
    this.localCanvasContext.fillRect(this.x1, this.y1, this.size, this.size);
  }
  //method to update the points ...
  setPoints(x, y) {
    //p1
    this.x1 = x;
    this.y1 = y;
  }

  update() {
    let newX = this.x1 + this.speedX;
    let newY = this.y1 + this.speedY;
    //set the points
    this.setPoints(newX, newY);
  }

  checkBounds(localCanvas) {
    if (this.x1 + this.size > localCanvas.width || this.x1 < 0) {
      this.speedX = this.speedX * -1;
    }

    if (this.y1 + this.size > localCanvas.height || this.y1 < 0) {
      this.speedY = this.speedY * -1;
    }
  }
}
/** end class def **/
