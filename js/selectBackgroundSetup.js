(() => {
  const body = document.querySelector("body");
  const backgroundSelectors = document.querySelectorAll(".background-selector");

  const selectBackground = event => {
    const target = event.target;
    const parentNode = target.parentNode;

    // branching to ensure we access the correct dataset
    // we overwrite the body's classList with whatever background was chosen
    if (parentNode.nodeName === "BODY") {
      body.classList = target.dataset["background"];
    } else {
      body.classList = parentNode.dataset["background"];
    }
  };

  for (const selector of backgroundSelectors) {
    selector.addEventListener("click", selectBackground);
  }
})();
