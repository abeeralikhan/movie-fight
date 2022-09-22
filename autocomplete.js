const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><strong> Search </strong></label>
  <input class="searchBar input" type="text"/>
  <div class="dropdown">
    <div class"dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const searchBar = root.querySelector(".searchBar");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    // for handling empty responses
    if (!items.length) {
      // hide dropdown menu if not found any searched title
      dropdown.style.display = "none";
      return;
    }

    // for clearing previous search results
    resultsWrapper.innerHTML = "";

    // for making the dropdown menu visible again
    // we are setting the display to none on external clicks & on empty responses
    dropdown.style.display = "block";

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.style.display = "none";
        searchBar.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  // wrapping the onInput function inside the debounce function,
  // and passing setting the delay equal to 500ms i.e 0.5s
  searchBar.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      // hide the dropdown menu on external clicks
      dropdown.style.display = "none";
    }
  });
};
