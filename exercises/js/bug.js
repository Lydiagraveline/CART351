class Bug {
  constructor(x, y, context) {
    this.state = {
      alive: true,
      dead: false,
      move: true,
      squish: false
    };

    //this.lineLength = lineLength;
    this.localCanvasContext = context;
    this.deg = 0;
    this.size = 20;

    //randomize speed
    this.speedX = 2;
    this.speedY = 4;
    this.setPoints(x, y);

    this.scale = 0.3;

    // sprite frames
    this.currentLoopIndex = 0;
    this.cycleLoop = [0, 1, 2, 3, 4];
    this.row = 0;
  }

  drawFrame(img, frameX, frameY, x, y) {
    let scale = 0.3;
    let width = 80;
    let height = 86.25;
    let scaledWidth = scale * width;
    let scaledHeight = scale * height;
    this.localCanvasContext.drawImage(
      img,
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

    if (this.state.squish) {
      this.localCanvasContext.drawImage(
        squishImg,
        this.x1 - 10, //offset the squished image a bit
        this.y1 - 10,
        50,
        50
      );
    } else {
      this.drawFrame(
        bugImg,
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
  drop() {
    this.row = 3;
    this.speedY = 6;
  }

  splat() {
    this.state.squish = true;
    this.speedY = 0;
    this.row = Math.floor(Math.random(3) * 2);
    console.log(this.row);
    this.state.move = false;
  }

  //kill the bug
  die() {
    this.state.dead = true;
    this.state.alive = false;
    //console.log(this.state);
    let randNum = Math.floor(Math.random(1) * 2);

    if (randNum == 0) {
      this.drop();
    } else if (randNum == 1) {
      this.splat();
    }
  }

  //mouse pressed
  checkMousePressed(eX, eY) {
    if (eX > this.x1 && eX < this.x1 + this.size) {
      if (eY > this.y1 && eY < this.y1 + this.size) {
        if (this.state.alive) {
          this.die();
        } else if (this.state.dead && !this.state.squish){
          this.splat();
        }
      }
    }
  } //check

}
/** end class def **/
