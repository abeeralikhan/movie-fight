/* 
API params
  s --> for index search (list) --> pass movie name
  i --> for show search (lookup) --> pass movie id
*/

// const API_KEY = "96f77f16"

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

  // for handling empty responses
  if (!movies.length) {
    // hide dropdown menu if not found any searched movie title
    dropdown.style.display = "none";
    return;
  }

  // for clearing previous search results
  resultsWrapper.innerHTML = "";

  // for making the dropdown menu visible again
  // we are setting the display to none on external clicks & on empty responses
  dropdown.style.display = "block";

  for (let movie of movies) {
    const option = document.createElement("a");

    // if poster of the movie is unavailable i.e "N/A",
    // setting it equal to an empty string to avoid errors
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;
    option.addEventListener("click", () => {
      dropdown.style.display = "none";
      searchBar.value = movie.Title;
      onMovieSelect(movie);
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

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "96f77f16",
      i: movie.imdbID,
    },
  });

  console.log(response.data);
};
