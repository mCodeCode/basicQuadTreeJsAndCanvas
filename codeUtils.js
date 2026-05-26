//global vars , and draw helper functions
const colorList = {
  red: "#ff0000",
  green: "#00ff15",
  blue: "#0004ff",
  yellow: "#f0d826",
  neonOrange: "#e34c32",
  purple: "#4f04bf",
  greenBlue: "#04b6bf",
  white: "#ffffff",
  black: "#000000",
};

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
function getRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

//----------------------------------------------------
//----------------------------------------------------

function getRandomPosition(entityMinPlacement, entityMaxPlacementX, entityMaxPlacementY, entityMaxPlacementZ) {
  // const x = Math.random() * (maxX - minX) + minX;
  const x = Math.random() * (entityMaxPlacementX - -entityMinPlacement) + -entityMinPlacement;
  const y = Math.random() * (entityMaxPlacementY - -entityMinPlacement) + -entityMinPlacement;
  const z = Math.random() * (entityMaxPlacementZ - -entityMinPlacement) + -entityMinPlacement;
  return { x, y, z };
}

//----------------------------------------------------
//----------------------------------------------------
function convertDegreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
//----------------------------------------------------
//----------------------------------------------------
function removeDecimals(fromNumber) {
  return Number.parseFloat(fromNumber).toFixed(7);
}

//----------------------------------------------------
//----------------------------------------------------
