// <!--  output generator (draws the generated code on the canvas) -->

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

//this will be used for canvas size
let canvW = window.innerWidth - 30;
let canvH = window.innerHeight - 50;

//get canvas
let mainCanvas = document.getElementById("mainMemoryCanvas");

//set canvas to full window
mainCanvas.width = canvW;
mainCanvas.height = canvH;

//get canvas context to write
const canvasCtx = mainCanvas.getContext("2d");

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// Quadtree setup

let rootBoundary = new Rectangle(0, 0, canvW, canvH);
let qTree = new QuadTree(rootBoundary);
console.log("QQQ qTree ", qTree);

// --------------------------------------------------
// --------------------------------------------------
// insert the first set of particles into the quadtree
let totalParticles = 0;
let particlesPosOffset = 10;

//--- insert first particles
for (let i = 0; i < totalParticles; i++) {
  let rp = getRandomPosition(0, canvW - particlesPosOffset, canvH - particlesPosOffset, 0);
  let p = new Point(rp.x, rp.y);
  qTree.insert(p);
  particlesArr.push(p);
}

// --------------------------------------------------
// --------------------------------------------------
//QQQ DEBUG drawings
// Draw quadtree boundaries and points for debug purposes
qTree.draw(canvasCtx);

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// insert particles at mouse position
// (can drag mouse while inserting particles)
/* 
Step 1: Get the Canvas-Relative Coordinates
You can use canvas.getBoundingClientRect() to get the exact position and scale of the canvas relative to the viewport. Subtracting these bounds from the mouse event coordinates gives you the exact pixel location on the canvas.
 
*/
let isDrawing = false;

mainCanvas.addEventListener("mousedown", () => (isDrawing = true));
mainCanvas.addEventListener("mouseup", () => (isDrawing = false));

mainCanvas.addEventListener("mousemove", function (event) {
  if (!isDrawing) return; // Only spawn if the mouse is held down

  const rect = mainCanvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  qTree.insert(new Point(mouseX, mouseY));
  qTree.draw(canvasCtx);
});
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
