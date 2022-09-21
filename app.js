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

  return response.data.Search;
};

const searchBar = document.querySelector(".searchBar");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.Poster}" />
      <h1> ${movie.Title} </h1>
    `;

    document.querySelector("#target").appendChild(div);
  }
};

searchBar.addEventListener("input", debounce(onInput, 500));
