let state = "options" //can be options or mealtime

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

  //ANYTHING OUTSIDE of animate function and not within another event handler WILL run only ONCE...
  //OnLOAD...
  for (let i = 0; i < 50; i++) {
    swarm.push(
      new Bug(i, Math.random() * canvas.height, Math.random() * 30 + 5, context)
    );
  }
  //bug object
  // let bug = new Bug(
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   100,
  //   context
  // );
  // bug.display();

  // window resize event
  window.addEventListener("resize", function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; //leave room for footer
    //invoke again - in order to update the triangle!!!
    bug.display();
    bug.setPoints(canvas.width / 2, canvas.height / 2);
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

function changeBackground() {
  let img = document.getElementById("menu");
  let value = img.options[img.selectedIndex].value;
  document.body.style.backgroundImage = ("url(" + value + ")")
}
