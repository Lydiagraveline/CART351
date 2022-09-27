let state = "options"; //can be options or mealtime

//empty array
let swarm = [];
let NUM_BUGS = 3; //new make a constant
const bugImg = new Image();
const squishImg = new Image();
bugImg.src = "images/fly-sprite.png";
squishImg.src = "images/squish.png";
let frameCount = 0;

window.onload = function () {
  // get the canvas
  let canvas = document.getElementById("canvas");
  // full screen canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100; //leave room for footer
  //get the context
  let context = canvas.getContext("2d");

  //add a mouseListener to canvas
  canvas.addEventListener("mousedown", mousePressed);
  function mousePressed(event) {
    // calculate the offset
    let pBox = this.getBoundingClientRect();
    // the one we use ...diff
    let mouse_offset_x = Math.floor(event.clientX - pBox.x);
    let mouse_offset_y = Math.floor(event.clientY - pBox.y);

    for (let i = 0; i < NUM_BUGS; i++) {
      swarm[i].checkMousePressed(mouse_offset_x, mouse_offset_y);
    }
  }

  //ANYTHING OUTSIDE of animate function and not within another event handler WILL run only ONCE...
  //OnLOAD...
  for (let i = 0; i < 50; i++) {
    swarm.push(
      new Bug(
        Math.random() * canvas.width, //x
        Math.random() * canvas.height, //y
        context
      )
    );
  }

  // window resize event
  window.addEventListener("resize", function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; //leave room for footer
    for (let i = 0; i < NUM_BUGS; i++) {
      swarm[i].display();
      swarm[i].setPoints(canvas.width / 2, canvas.height / 2);
    }
  });

  // animate the bugs
  requestAnimationFrame(animate);

  function animate() {
    //slow down animation frame rate
    frameCount++;
    if (frameCount < 5) {
      requestAnimationFrame(animate);
      return;
    }
    frameCount = 0;
    //clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //animate the bugs
    for (let i = 0; i < NUM_BUGS; i++) {
      swarm[i].update();
      swarm[i].checkBounds(canvas);
      swarm[i].display();
    }
    requestAnimationFrame(animate);
  } //end animation
}; //end load

//change background image menu
function changeBackground() {
  let img = document.getElementById("menu");
  let value = img.options[img.selectedIndex].value;
  document.body.style.backgroundImage = "url(" + value + ")";

  let id = img.options[img.selectedIndex].getAttribute("id");
  //console.log(id);
  if (id == "scale") {
    document.body.style.backgroundSize = "700px";
  } else {
    document.body.style.backgroundSize = "auto";
  }
  //add a new bug every time the user changes the background
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  NUM_BUGS += 1;
}
