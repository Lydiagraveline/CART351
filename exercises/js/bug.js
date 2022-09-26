class Bug {
  constructor(x, y, context) {
    //this.lineLength = lineLength;
    this.localCanvasContext = context;
    this.fillColor = "#8ED6FF";
    this.strokeColor = "#FFFFFF";
    this.size = 50;

    //randomize speed
    this.speedX  =2;
    this.speedY =4;
    this.setPoints(x, y);
  }
  //method to display the triangle using the HTML 5 canvas API
  display() {
    this.localCanvasContext.fillStyle = this.fillColor;
    this.localCanvasContext.fillRect(this.x1, this.y1, this.size, this.size);
  }

  //method to update the points ...
  setPoints(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  update() {
   let newX = this.x1+this.speedX;
   let newY = this.y1+this.speedY;

   this.setPoints(newX,newY);
  }

  // check if out of bounds
  checkBounds(localCanvas){
  if(this.x1 + this.size > localCanvas.width || this.x1<0 ){
      this.speedX = this.speedX*-1;
   }

  if(this.y1 + this.size >localCanvas.height || this.y1<0 ){
      this.speedY=this.speedY*-1;
  }
}

//mouse over
  checkMouseCollision(eX, eY){
    if (eX>this.x1 && eX<this.x1 + this.size){
      if(eY > this.y1 && eY<this.y1 + this.size){
        //change direction
       this.speedX = -this.speedX
      }
      //no y match
      else{this.fillColor = "#8ED6FF";}
    }
    //no x match
    else{this.fillColor = "#8ED6FF";}
  }//check
}
/** end class def **/
