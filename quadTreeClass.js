// --------------------------------------------------
// --------------------------------------------------
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// --------------------------------------------------
// --------------------------------------------------
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // ---------------------------
  // ---------------------------
  // A point (x, y)
  // is inside a rectangle defined by (rectX, rectY, width, height)
  // if: (x >= rectX)
  //     (x <= rectX + width)
  //     (y  >= rectY)
  //     (y <= rectY + height)
  contains(point) {
    let px = point.x;
    let py = point.y;
    let rx = this.x;
    let ry = this.y;
    let rw = this.w;
    let rh = this.h;
  
    return px >= rx && px < rx + rw && py >= ry && py < ry + rh;
  }
}
// --------------------------------------------------
// --------------------------------------------------
// the quadtree works like this :
//*  it starts at the root with a boundary with size equal to the canvas (or the screen size, or the container of the simulation)
//* you insert points into the quadtree at random positions
//* when you insert points, check the current boundary capacity
//  ---> if its full , subdivide, creating 4 new boundaries inside the current one
//  ---> after creating the boundaries, check where the point is located and insert it
//       in the correct boundary (top left, top right, botton left, bottom right)
// the division is taking a rectangle and dividing that rectangle into 4 small rectangles, each one a new quadtree.
//* this process repeats, untill the point/all points are inserted into a quadtree
//* each quadTree has a list of points to keep track of, along with a variable to check if its full

class QuadTree {
  // ---------------------------
  // ---------------------------
  constructor(boundary) {
    this.boundary = boundary;
    this.capacity = 4;
    this.boundaryPoints = [];
    this.hasDivided = false;
  }

  // ---------------------------
  // ---------------------------
  /*
 When you subdivide a rectangle,
 the width and height do cut in half (this.boundary.w / 2),
  but the X and Y starting positions for the right and bottom quadrants must be offsets relative to the parent's current position (this.boundary.x and this.boundary.y)
  If your parent tree is a deep nested node shifted over to X = 400, its child shouldn't start at half the width; it should start at 400 + (width / 2).
 */
  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;

    // Top Left: Starts at parent X, Y
    let tlBox = new Rectangle(x, y, w, h);
    this.topLeftBoundary = new QuadTree(tlBox);

    // Top Right: Shifts right by half-width
    let trBox = new Rectangle(x + w, y, w, h);
    this.topRightBoundary = new QuadTree(trBox);

    // Bottom Left: Shifts down by half-height
    let blBox = new Rectangle(x, y + h, w, h);
    this.bottomLeftBoundary = new QuadTree(blBox);

    // Bottom Right: Shifts right by half-width AND down by half-height
    let brBox = new Rectangle(x + w, y + h, w, h);
    this.bottomRightBoundary = new QuadTree(brBox);

    this.hasDivided = true;
  }
  // ---------------------------
  // ---------------------------
  insert(point) {
    //check if point position falls into current boundary before inserting
    if (!this.boundary.contains(point)) return;

    if (this.boundaryPoints.length < this.capacity) {
      this.boundaryPoints.push(point);
    } else {
      if (!this.hasDivided) {
        //subdivide the current boundary
        this.subdivide();
      }

      //insert point in subdivision, this is recursive
      this.topLeftBoundary.insert(point);
      this.topRightBoundary.insert(point);
      this.bottomLeftBoundary.insert(point);
      this.bottomRightBoundary.insert(point);
    }
  }
  // ---------------------------
  // ---------------------------
  // this method depends on what you use to draw the quadtree
  draw(canvasCtx) {
    //---
    canvasCtx.strokeStyle = "orange";
    canvasCtx.lineWidth = 3;
    canvasCtx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);

    for (let i = 0; i < this.boundaryPoints.length; i++) {
      const p = this.boundaryPoints[i];
      canvasCtx.fillStyle = "purple";
      canvasCtx.fillRect(p.x, p.y, 10, 10);
    }

    if (this.hasDivided) {
      this.topLeftBoundary.draw(canvasCtx);
      this.topRightBoundary.draw(canvasCtx);
      this.bottomLeftBoundary.draw(canvasCtx);
      this.bottomRightBoundary.draw(canvasCtx);
    }
  }
}
