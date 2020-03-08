(() => {
  const body = document.querySelector("body");
  // capture all draggableIcons as a nodelist and then create an array from the nodelist
  // this gives us access to array methods that don't exist on nodelist
  let draggableIcons = document.querySelectorAll("div[draggable]");
  let iconArray = Array.from(draggableIcons);
  let touchSourceIndex;

  //capture target's index in draggableIcons nodelist and save it within dataTransfer
  const onDragStart = event => {
    const targetIndex = iconArray.indexOf(event.target);
    event.dataTransfer.setData("text/plain", targetIndex);
  };

  // browsers prevent drop actions by default, we make sure they're allowed here
  const onDragOver = event => event.preventDefault();

  // derive sourceElement with dataTransfer from onDragStart
  const onDrop = event => {
    const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"));
    const target = event.target;

    moveIcons(target, sourceIndex);
  };

  // capture where the touch started and store in a global variable for later access
  const onTouchMove = event => {
    const targetIndex =
      iconArray.indexOf(event.target) !== -1
        ? iconArray.indexOf(event.target)
        : iconArray.indexOf(event.target.parentNode);
    touchSourceIndex = targetIndex;
  };

  // derive target by finding where the touch ended
  const onTouchEnd = event => {
    const changedTouch = event.changedTouches[0];
    const target = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    );

    moveIcons(target, touchSourceIndex);
  };

  for (const icon of draggableIcons) {
    icon.addEventListener("dragstart", onDragStart);
    icon.addEventListener("dragover", onDragOver);
    icon.addEventListener("drop", onDrop);
    icon.addEventListener("touchmove", onTouchMove);
    icon.addEventListener("touchend", onTouchEnd);
  }

  // check target's class name to see if target is the element we need to act on
  // if not, we need to act on target's parent
  // if the sourceIndex is larger than targetIndex, we insert source element before element after target
  // otherwise, we insert source element before target itself
  const moveIcons = (target, sourceIndex) => {
    const sourceElement = draggableIcons[sourceIndex];

    if (target.className === "icon-wrapper") {
      const targetIndex = iconArray.indexOf(target);
      targetIndex < sourceIndex
        ? body.insertBefore(sourceElement, target)
        : body.insertBefore(sourceElement, draggableIcons[targetIndex + 1]);
    } else {
      const parentNode = target.parentNode;
      const parentNodeIndex = iconArray.indexOf(parentNode);
      parentNodeIndex < sourceIndex
        ? body.insertBefore(sourceElement, parentNode)
        : body.insertBefore(sourceElement, draggableIcons[parentNodeIndex + 1]);
    }

    // update our variables based off of current DOM structure
    draggableIcons = document.querySelectorAll("div[draggable]");
    iconArray = Array.from(draggableIcons);
  };
})();
