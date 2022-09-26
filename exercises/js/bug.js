class Bug {
  constructor(x, y, context) {
    //this.lineLength = lineLength;
    this.localCanvasContext = context;
    this.size = 50;

    //randomize speed
    this.speedX = 2;
    this.speedY = 4;
    this.setPoints(x, y);
    //this.animateSprite();

    this.scale = 0.5;
    this.width = 80//16;
    this.height = 86.25//18;
    this.scaledWidth = scale * this.width;
    this.scaledHeight = scale * this.height;

    // sprite frames
    this.currentLoopIndex = 0;
    this.cycleLoop = [0, 1, 2, 3, 4];
    this.frameCount = 0;
  }


  drawFrame(frameX, frameY, x, y) {
  let scale = 0.5;
  let width = 80;
  let height = 86.25;
  let scaledWidth = scale * this.width;
  let scaledHeight = scale * this.height;
  this.localCanvasContext.drawImage(bugImg,
                frameX * width, frameY * height, width, height,
                x, y, scaledWidth, scaledHeight);
}

  //method to display the triangle using the HTML 5 canvas API
  display(frameCount) {
    //transparent background
    this.localCanvasContext.fillStyle = 'rgba(0, 0, 0, 0)';
  //  this.localCanvasContext.fillStyle = 'red';
    this.localCanvasContext.fillRect(this.x1, this.y1, this.size, this.size);

    // loop through the sprite frames
  //   this.frameCount++;
  //   if (this.frameCount > 15) {
  //
  //   //window.requestAnimationFrame(this.display);
  //   return;
  // }
  //   this.frameCount = 0;
    //this.localCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
    this.drawFrame(this.cycleLoop[this.currentLoopIndex], 0, this.x1, this.y1);
    this.currentLoopIndex++;
    //console.log(this.currentLoopIndex)
    if (this.currentLoopIndex >= this.cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
    // this.localCanvasContext.drawImage(bugImg, 0, 0, width, height, this.x1, this.y1, scaledWidth, scaledHeight);
    // this.localCanvasContext.drawImage(bugImg, width, 0, width, 87, this.x1 + scaledWidth, this.y1, scaledWidth, scaledHeight);
    // this.localCanvasContext.drawImage(bugImg, width * 2, 0, width, 87, this.x1 + scaledWidth * 2, this.y1, scaledWidth, scaledHeight);
    // this.localCanvasContext.drawImage(bugImg, width * 3, 0, width, 87, this.x1 + scaledWidth * 3, this.y1, scaledWidth, scaledHeight);
    // this.localCanvasContext.drawImage(bugImg, width * 4, 0, width, 87, this.x1 + scaledWidth * 3, this.y1, scaledWidth, scaledHeight);

    //this.drawFrame(0, 0, this.x1, this.y1);
    //this.drawFrame(1, 0, this.x1 + 50, this.y1);
    //requestAnimationFrame(() => { this.step() } );

    //this.localCanvasContext.drawImage(bugImg, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);
    //this.localCanvasContext.drawImage(bugImg, width, 0, width, height, scaledWidth, 0, scaledWidth, scaledHeight);
  //  this.localCanvasContext.drawImage(bugImg, width * 2, 0, width, height, scaledWidth * 2, 0, scaledWidth, scaledHeight);
//this.localCanvasContext.requestAnimationFrame(this.display);
  //setTimeout(this.display, 0);
  }

  //method to update the points ...
  setPoints(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  update() {
    let newX = this.x1 + this.speedX;
    let newY = this.y1 + this.speedY;

    this.setPoints(newX, newY);
  }

  // check if out of bounds
  checkBounds(localCanvas) {
    if (this.x1 + this.size > localCanvas.width || this.x1 < 0) {
      this.speedX = this.speedX * -1;
    }

    if (this.y1 + this.size > localCanvas.height || this.y1 < 0) {
      this.speedY = this.speedY * -1;
    }
  }

  //mouse over
  checkMouseCollision(eX, eY) {
    if (eX > this.x1 && eX < this.x1 + this.size) {
      if (eY > this.y1 && eY < this.y1 + this.size) {
        //change direction
        this.speedX = -this.speedX;
      }
      //no y match
      else {
        this.fillColor = "#8ED6FF";
      }
    }
    //no x match
    else {
      this.fillColor = "#8ED6FF";
    }
  } //check

}
/** end class def **/
