let state = "options"; //can be options or mealtime

//empty array
let swarm = [];
const NUM_BUGS = 3; //new make a constant

window.onload = function () {
  // get the canvas
  let canvas = document.getElementById("canvas");
  // full screen canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100; //leave room for footer
  //get the context
  let context = canvas.getContext("2d");

  //add a mouseListener to canvas
  canvas.addEventListener("mousemove", canvasIsActive);
  //
  // /* our call back when the mouse moves within the canvas */
  function canvasIsActive(event) {

    // calculate the offset
    let pBox = this.getBoundingClientRect();
    // the one we use ...diff
    let mouse_offset_x = Math.floor(event.clientX - pBox.x);
    let mouse_offset_y = Math.floor(event.clientY - pBox.y);

    for (let i = 0; i < NUM_BUGS; i++) {
      swarm[i].checkMouseCollision(mouse_offset_x, mouse_offset_y);

    }
  }

  //ANYTHING OUTSIDE of animate function and not within another event handler WILL run only ONCE...
  //OnLOAD...
  for (let i = 0; i < 50; i++) {
    swarm.push(
      new Bug(Math.random() * canvas.width, Math.random() * canvas.height, context)
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
    //repaint with a black rect..
    context.clearRect(0, 0, canvas.width, canvas.height);

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
}
