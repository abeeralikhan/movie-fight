/* 
API params
  s --> for index search (list) --> pass movie name
  i --> for show search (lookup) --> pass movie id
*/

// helper function: for index search or to get partial data of movies
const fetchData = async (searchQuery) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "96f77f16",
      s: searchQuery,
    },
  });

  // returning an empty array if the response consists of any error
  if (response.data.Error) {
    return [];
  }

  // returning the array of the movies object
  return response.data.Search;
};

const root = document.querySelector(".autocomplete");

root.innerHTML = `
  <label><strong> Search For a Movie </strong></label>
  <input class="searchBar input" type="text"/>
  <div class="dropdown">
    <div class"dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const searchBar = document.querySelector(".searchBar");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;

    resultsWrapper.appendChild(option);
  }
};

searchBar.addEventListener("input", debounce(onInput, 500));
