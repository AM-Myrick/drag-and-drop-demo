(() => {
  // capture all icons as a nodelist
  const icons = document.querySelectorAll(".icon-styles");
  // function to check which icons should be set as backgroundImage
  const isHighResScreen = () => window.devicePixelRatio > 1;

  for (let [index, icon] of icons.entries()) {
    // increment index by 1 instead of having 0 based indexes
    index += 1;
    const filename = index.toString().length > 1 ? `0${index}` : `00${index}`;

    if (isHighResScreen()) {
      icon.style.backgroundImage = `url("../assets/${filename}@2x.png")`;
    } else {
      icon.style.backgroundImage = `url("../assets/${filename}.png")`;
    }
  }
})();
