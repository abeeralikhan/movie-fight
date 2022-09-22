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

createAutoComplete({
  root: document.querySelector(".autocomplete1"),
});

createAutoComplete({
  root: document.querySelector(".autocomplete2"),
});

createAutoComplete({
  root: document.querySelector(".autocomplete3"),
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "96f77f16",
      i: movie.imdbID,
    },
  });

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
