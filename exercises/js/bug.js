class Bug {
  constructor(x, y, context) {
    this.state = {
      alive: true,
      dead: false,
      move: true,
    };

    //this.lineLength = lineLength;
    this.localCanvasContext = context;
    this.deg = 0;
    this.size = 50;

    //randomize speed
    this.speedX = 2;
    this.speedY = 4;
    this.setPoints(x, y);

    this.scale = 0.5;
    this.width = 80; //16;
    this.height = 86.25; //18;
    this.scaledWidth = scale * this.width;
    this.scaledHeight = scale * this.height;

    // sprite frames
    this.currentLoopIndex = 0;
    this.cycleLoop = [0, 1, 2, 3, 4];
    this.row = 0;
  }

  drawFrame(frameX, frameY, x, y) {
  //  bugImg.style.transform = "rotate(90deg)";
    let scale = 0.5;
    let width = 80;
    let height = 86.25;
    let scaledWidth = scale * this.width;
    let scaledHeight = scale * this.height;
    this.localCanvasContext.drawImage(
      bugImg,
      frameX * width,
      frameY * height,
      width,
      height,
      x,
      y,
      scaledWidth,
      scaledHeight
    );
  }

  //method to display the triangle using the HTML 5 canvas API
  display() {
    //transparent background
    this.localCanvasContext.fillStyle = "rgba(0, 0, 0, 0)";
    //this.localCanvasContext.fillStyle = "red";
    this.localCanvasContext.fillRect(this.x1, this.y1, this.size, this.size);

    if (this.state.alive) {
      //this.cycleLoop = [0, 1, 2, 3, 4];
      this.row = 0;
    } else if (this.state.dead) {
      this.row = 3;
    }

    this.drawFrame(
      this.cycleLoop[this.currentLoopIndex],
      this.row,
      this.x1,
      this.y1
    );
    if (this.state.move) {
      this.currentLoopIndex++;

      if (this.currentLoopIndex >= this.cycleLoop.length) {
        this.currentLoopIndex = 0;
      }
    }
  }

  //method to update the points ...
  setPoints(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  update() {
    let newX;
    let newY;
    //move around if alive
    if (this.state.alive) {
      newX = this.x1 + this.speedX;
      newY = this.y1 + this.speedY;
      //fall if dead
    } else if (this.state.dead) {
      newX = this.x1;
      newY = this.y1 + this.speedY;
      //this.localCanvasContext.rotate(90);
    }
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
    // if dead, stop moving when they reach the bottom
    if (this.state.dead && this.y1 + this.size > localCanvas.height) {
      this.speedY = 0;
      //this.cycleLoop = 0;
      this.state.move = false;
      //console.log(this.state.move)
    }
  }

  // drop dead
  drop(currentY) {
    this.state.dead = true;
    this.state.alive = false;
    this.speedY = 6;
  }

  //mouse over
  checkMousePressed(eX, eY) {
    if (eX > this.x1 && eX < this.x1 + this.size) {
      if (eY > this.y1 && eY < this.y1 + this.size) {
        //change direction
        //this.speedX = -this.speedX;
        console.log(this.state);
        this.drop(this.y1);
      }
    }
  } //check

  //mouse over
  checkMouseCollision(eX, eY) {
    if (eX > this.x1 && eX < this.x1 + this.size) {
      if (eY > this.y1 && eY < this.y1 + this.size) {
        //fly away
        //this.speedX = -this.speedX;
      }
    }
  } //check
}
/** end class def **/
