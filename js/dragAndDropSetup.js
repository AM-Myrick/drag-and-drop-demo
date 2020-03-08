(() => {
  const body = document.querySelector("body");
  // capture all draggableIcons as a nodelist and then create an array from the nodelist
  // this gives us access to array methods that don't exist on nodelist
  let draggableIcons = document.querySelectorAll("div[draggable]");
  let iconArray = Array.from(draggableIcons);

  const onDragStart = event => {
    //capture target's index in draggableIcons nodelist and save it within dataTransfer
    const targetIndex = iconArray.indexOf(event.target);
    event.dataTransfer.setData("text/plain", targetIndex);
  };

  // browsers prevent drop actions by default, we make sure they're allowed here
  const onDragOver = event => event.preventDefault();

  const onDrop = event => {
    // derive sourceElement from dataTransfer
    const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"));
    const sourceElement = draggableIcons[sourceIndex];
    const target = event.target;
    const targetClassName = target.className;

    // check target's class name to see if target is the element we need to act on
    // if not, we need to act on target's parent
    // if the sourceIndex is larger than targetIndex, we insert source element before element after target
    // otherwise, we insert source element before target itself
    if (targetClassName === "icon-wrapper") {
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

  for (const icon of draggableIcons) {
    icon.addEventListener("dragstart", onDragStart);
    icon.addEventListener("dragover", onDragOver);
    icon.addEventListener("drop", onDrop);
  }
})();
