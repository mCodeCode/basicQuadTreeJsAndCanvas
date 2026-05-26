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

//root boundary is at the center of the cavas, and it's the size of the canvas itself
let rootBoundary = new Rectangle(0, 0, canvW, canvH);
let qTree = new QuadTree(rootBoundary);
console.log("QQQ qTree ", qTree);

// --------------------------------------------------
// --------------------------------------------------
// insert the first set of particles into the quadtree
let totalParticles = 0;
let particlesPosOffset = 10;
// for rebuilding the quadtree each frame of the simulation
let particlesArr = [];
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

/* 

// Draw a red filled rectangle
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 150, 100);

// Draw a blue outlined rectangle
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
ctx.strokeRect(200, 10, 150, 100);

*/

// programMainLoop renders the generated code of the program into the canvas
// instructionsTable, currentMemoryLayer, totalMemoryLayers come from the SWP_v3.js file
const programMainLoop = () => {
  // clearRect(x, y, width, height)
  // console.log("QQQ memHeight: \n ", memHeight);
  // console.log("QQQ app is running \n ");
  // canvasCtx.fillStyle = currCellColor;
  // //draw memory cell (x,y,w,h)
  // canvasCtx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
};

// --------------------------------------------------
// --------------------------------------------------

let intervalId;

//interval for the main loop
if (!intervalId) {
  intervalId = setInterval(programMainLoop, 50);
}

//logic for keypress
// q key ---> stop the program.
document.addEventListener("keydown", (event) => {
  //---------------------------------
  //---------------------------------
  //stop looping and generating data ("stops" the program)
  if (event.key === "q") {
    clearInterval(intervalId);
    // release our intervalId from the variable
    intervalId = null;
  }

  //---------------------------------
  //---------------------------------
  //log snapshot of memory in the console
  // if (event.key === "z") {
  //   console.log("QQQ memory snapshot : \n ");
  // }
  //---------------------------------
  //---------------------------------
  //reload page like F5
  // if (event.key === "g") {
  //   window.location.reload();
  // }
});
