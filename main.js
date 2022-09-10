const API_KEY = 'api_key=f414937c923b64169b208765e8e15b13';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
// https://api.themoviedb.org/3/search/movie?api_key=f414937c923b64169b208765e8e15b13&query=l

let movie;
const search = document.getElementById('search');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const main = document.getElementById('main');
const current = document.getElementById('current');
var current_page = 1;
var next_page = 0;
var prev_page = 0;
var total_pages = 100;

get_movie(API_URL);

function get_movie(url) {
  axios.get(url)
    .then(function (response) {
      movie = response.data
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    .then(function () {
      main.innerHTML = '';
      current.innerText = movie.page;
      for (let index = 0; index < movie.results.length; index++) {

        const image = document.createElement("img");

        image.src = `https://image.tmdb.org/t/p/original/${movie.results[index].poster_path}`;

        const rating = document.createElement("h4");

        rating.innerText = movie.results[index].vote_average;

        const card = document.createElement("div");

        const judul = document.createElement("h3");

        judul.innerText = movie.results[index].original_title;

        const date = document.createElement("h4");

        date.innerText = movie.results[index].release_date;

        rating.className = 'rating';

        card.appendChild(rating);

        image.className = 'image';

        card.appendChild(image);

        judul.className = 'judul';

        card.appendChild(judul);

        date.className = 'date';

        card.appendChild(date);

        card.className = 'card';

        const main = document.querySelector('#main');

        main.appendChild(card);

      }
      page(movie.page);
    });
}

function page(page) {
  current_page = page;
  next_page = current_page + 1;
  prev_page = current_page - 1;

}

prev.addEventListener('click', () => {
  if (prev_page > 0) {
    page_call(prev_page);
  }
})

next.addEventListener('click', () => {
  console.log(next_page)
  if (next_page <= 10) {
    page_call(next_page);
  }
})

function page_call(halaman) {
  document.documentElement.scrollTop = 0;
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=f414937c923b64169b208765e8e15b13&language=en-US&page=` + halaman;
  get_movie(url);
}


search.addEventListener('blur', () => {
  const searchTerm = search.value
  get_movie(searchURL+'&query='+searchTerm);
})

//search movie
// form.addEventListener('submit', (e) => {
//   e.preventdefault();

//   const searchTerm = search.value;
//   if (searchTerm) {
//     get_movie(`https://api.themoviedb.org/3/search/movie?api_key=f414937c923b64169b208765e8e15b13&query=l`);
//     console.log('dapat');
//   } else {
//     console.log('raono');
//     get_movie(API_URL);
//   }
//   console.log('dapat');
// })