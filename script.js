function searchMovie() {
  const apiKey = '4113f3ad734e747a5b463cde8c55de42';
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';
  const movieInput = $('#movieInput').val();
  const resultContainer = $('#resultContainer');

  $.ajax({
    url: `${apiUrl}?api_key=${apiKey}&language=en-US&query=${movieInput}`,
    method: 'GET',
    success: function (data) {
      displayResults(data, resultContainer);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });
}

function fetchMovies(category) {
  const apiKey = '4113f3ad734e747a5b463cde8c55de42';
  const apiUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
  const resultContainer = $('#resultContainer');

  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (data) {
      displayResults(data, resultContainer);
    },
    error: function (error) {
      console.error(`Error fetching ${category} movies:`, error);
    }
  });
}

function displayResults(data, container) {
  container.html('');

  if (data.results.length === 0) {
    container.html('<p>No results found.</p>');
    return;
  }

  const movies = data.results;
  movies.forEach(movie => {
    const card = $('<div>').addClass('card');
    const img = $('<img>').addClass('card-img-top').attr('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`).attr('alt', movie.title);
    const cardBody = $('<div>').addClass('card-body');
    const title = $('<h5>').addClass('card-title').text(movie.title);
    const producer = $('<p>').addClass('card-text').text(`Producer: ${movie.crew}`);
    const actor = $('<p>').addClass('card-text').text(`Actor: ${movie.cast}`);
    const rating = $('<p>').addClass('card-text').text(`Rating: ${movie.vote_average}`);
    const duration = $('<p>').addClass('card-text').text(`Duration: ${movie.runtime} minutes`);
    const releaseDate = $('<p>').addClass('card-text').text(`Release Date: ${movie.release_date}`);
    const hr = $('<hr>');
    const overview = $('<p>').addClass('card-text').text(movie.overview);

    card.append(img);
    cardBody.append(title, producer, actor, rating, duration, releaseDate, hr, overview);
    card.append(cardBody);
    container.append(card);
  });
}
