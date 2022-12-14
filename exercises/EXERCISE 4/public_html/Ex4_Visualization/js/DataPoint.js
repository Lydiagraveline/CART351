//class for our single datapoint object
//you ARE allowed to change it if you wish :)

class myDataPoint{
//gets filled from the db request
constructor(id,day,weather,start_mood,after_mood,am_strength,event_affect_strength, eID, colorAsString, parentContainer,cssStyle){
    this.id = id;
    this.day = day;
    this.weather = weather;
    this.start_mood = start_mood;
    this.after_mood = after_mood;
    this.am_strength = parseInt(am_strength);
    this.event_affect_strength =parseInt(event_affect_strength);
    this.eID =eID;
    this.x =0;
    this.y = 0;

    this.colorAsString= colorAsString;
    this.container = document.createElement("div");
    this.container.classList.add(cssStyle);
    this.container.style.background = this.colorAsString;
    parentContainer.appendChild(this.container);

  }
  update(inX,inY,size){
    this.x = inX;
    this.y = inY;
    this.container.style.left = inX+"px";
    this.container.style.top = inY+"px";

    //change size
    this.container.style.width = size+"px";
    this.container.style.height = size+"px";
    
  }

  updateCircles(size) {
   
    // let newSize =  (parseInt(this.container.style.width, 10) + 240) + 'px';
    //let newSize =  parseInt(this.container.style.width);
    console.log(size + "%");
     this.container.style.width =  size+"%";
     this.container.style.height =  size+"%";
    // this.container.style.width = 2*size+"px";
    // this.container.style.height = 2*size+"px";
  }

}//end class
