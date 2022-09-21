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

  console.log(response.data);
};

const searchBar = document.querySelector(".searchBar");

const onInput = (event) => {
  fetchData(event.target.value);
};

searchBar.addEventListener("input", debounce(onInput, 500));
