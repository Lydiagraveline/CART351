window.onload = function () {
  // get the canvas
  let canvas = document.getElementById("canvas");
  //a
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //get the context
  let context = canvas.getContext("2d");
  let bug = new Bug(
    canvas.width / 2,
    canvas.height / 2,
    100,
    context
  );
  bug.display();

  window.addEventListener("resize", function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //invoke again - in order to update the triangle!!!
    bug.display();
    bug.setPoints(canvas.width / 2, canvas.height / 2);
  });

  requestAnimationFrame(animate);

  function animate() {
    //repaint with a black rect..
    context.clearRect(0, 0, canvas.width, canvas.height);
    bug.update();
    bug.checkBounds(canvas);
    bug.display();
    requestAnimationFrame(animate);
  }
};
