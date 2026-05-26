//global vars , and helper functions

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
