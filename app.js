/* 
API params
  s --> for index search (list) --> pass movie name
  i --> for show search (lookup) --> pass movie id
*/
const configAutoComplete = {
  renderOption(movie) {
    // if poster of the movie is unavailable i.e "N/A",
    // setting it equal to an empty string to avoid errors
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },

  inputValue(movie) {
    return movie.Title;
  },

  // helper function: for index search or to get partial data of movies
  async fetchData(searchQuery) {
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
  },
};

createAutoComplete({
  ...configAutoComplete,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});

createAutoComplete({
  ...configAutoComplete,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});

let leftMovie, rightMovie;

const onMovieSelect = async (movie, summaryTarget, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "96f77f16",
      i: movie.imdbID,
    },
  });

  summaryTarget.innerHTML = movieTemplate(response.data);

  if (side === "left") leftMovie = response.data;
  else rightMovie = response.data;

  if (leftMovie && rightMovie) runComparision();
};

const runComparision = () => {
  console.log("Time for comparision");
};

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  const awards = movieDetail.Awards.split(" ").reduce((count, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return count;
    } else {
      return count + value;
    }
  }, 0);

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
