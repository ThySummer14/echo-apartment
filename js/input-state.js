// Modal transitions must clear every input source, including a touch that ends
// after its joystick element has been hidden.
export function clearMovementInput(state) {
  state.keys={};state.dragging=false;state.touchRun=false;
  state._joyId=null;state._lookId=null;
  if(state.touchMove){state.touchMove.x=0;state.touchMove.y=0;}
}
