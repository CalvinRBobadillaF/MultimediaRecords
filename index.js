// ENLACES DE LOS DATOS REQUERIDOS
const API_KEY = 'a9077a7501dfc374b7121d2d4db264e6';
const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-EN&page=1`;
const URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_EN_CARTELERA = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_PROXIMAMENTE = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`;

// DOM ID'S
const input = document.getElementById('input')
const popularMovies = document.getElementById('movie-poster')
const comingSoon = document.getElementById('coming-soon')
const suggestion = document.getElementById('movie-suggestions')
const topRated = document.getElementById('top-rated')
const main = document.getElementById('Main')
const header = document.getElementById('header')
const returnButton = document.getElementById('returnButton')
const movieDetails = document.getElementById('Movie-details')
const showDetailsPoster = document.getElementById('showDetails-poster')
const sinopsis = document.getElementById('sinopsis')
const button = document.getElementById('details-button')
const title = document.getElementById('title')
const popularity = document.getElementById('popularity')
const calification = document.getElementById('calification')
const release = document.getElementById('release')
const filterButton = document.getElementById('filter-button')
const Filter = document.getElementById('Filter')
const Heroes = document.getElementById('Heroes')
const Action = document.getElementById('Action')
const Comedy = document.getElementById('Comedy')
const Drama = document.getElementById('Drama')
const popularP = document.getElementById('popular-p')
const all = document.getElementById('All')
const close = document.getElementById('close')

const typeHeroe = 28
const typeComedy = 35
const typeAction = 878
const typeDrama = 18

let allPopularMovies = []
let allComingSoon = []
let allTopRated = []
let allNowPlaying = []
let genre_id = []

// Mostrar detalles de película
function displayDetails() {
  main.style.display = 'none'
  header.style.display = 'none'
  movieDetails.style.display = 'grid'
}

// Regresar a la pantalla principal
function returnToHome() {
  main.style.display = 'block'
  header.style.display = 'grid'
  movieDetails.style.display = 'none'
}

// Obtener datos desde la API
async function fetchData(URL) {
  const response = await fetch(URL)
  const data = await response.json()
  
  return data.results

}

// Renderizar y manejar clics
async function fetchAndRenderMovies(url, container, saveInMemory = false) {
  const movies = await fetchData(url)
  container.innerHTML = ""
  
  movies.forEach(movie => {
    const fullPoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    const img = document.createElement("img")
    img.src = fullPoster
    img.alt = movie.title
    img.id = movie.genre_ids
    container.appendChild(img)
    
    img.addEventListener("click", () => showDetailsFromMovie(movie))
  })

  if (saveInMemory) {
    if (url === URL_POPULARES) allPopularMovies = movies
    else if (url === URL_PROXIMAMENTE) allComingSoon = movies
    else if (url === URL_TOP_RATED) allTopRated = movies
    else if (url === URL_EN_CARTELERA) allNowPlaying = movies
  }
}
  
  


// Mostrar información en la vista de detalles
function showDetailsFromMovie(movie) {
  showDetailsPoster.innerHTML = ''
  title.textContent = movie.title
  sinopsis.textContent = movie.overview

  const detailImg = document.createElement('img')
  detailImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  detailImg.alt = movie.title
  showDetailsPoster.appendChild(detailImg)
  
  calification.textContent = `Popular vote: ${movie.popularity}`
  popularity.textContent = `Calification: ${movie.vote_average}`
  release.textContent = `Original release: ${movie.release_date}`
  
  displayDetails()
}

returnButton.addEventListener('click', returnToHome)

// Buscar y mostrar resultados
function displaySearchResults(list) {
  popularMovies.innerHTML = ""
  

  if (list.length == '') {
    popularMovies.innerHTML = "<p>No se encontraron resultados.</p>"
    
    return
  }


  list.forEach(movie => {
    const img = document.createElement("img")
    img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    img.alt = movie.title
    img.id = movie.id
    popularMovies.appendChild(img)
    img.addEventListener('click', () => showDetailsFromMovie(movie))
    
  })
}


async function showTypeMovies(type) {
  
  await fetchData(URL_EN_CARTELERA)
  await fetchData(URL_POPULARES)
  await fetchData(URL_TOP_RATED)
  await fetchData(URL_PROXIMAMENTE) 

  
  

  const allMovies = [
      ...allPopularMovies,
      ...allComingSoon,
      ...allTopRated,
      ...allNowPlaying
    ]

  // Filtra películas que incluyen el género 28 (Acción)
  const typeMovies = allMovies.filter(movie => 
    movie.genre_ids.includes(type)
  )
  displaySearchResults(typeMovies)
  
}

function showFilterSection () {
Filter.classList.toggle('show')
}

// Inicializar todo
async function startApp() {
  await fetchAndRenderMovies(URL_POPULARES, popularMovies, true)
  await fetchAndRenderMovies(URL_PROXIMAMENTE, comingSoon, true)
  await fetchAndRenderMovies(URL_EN_CARTELERA, suggestion, true)
  await fetchAndRenderMovies(URL_TOP_RATED, topRated, true)

  const allMovies = [
      ...allPopularMovies,
      ...allComingSoon,
      ...allTopRated,
      ...allNowPlaying
    ]

  input.addEventListener("input", () => {
    
    
    const searchTerm = input.value.toLowerCase()
    if (searchTerm.trim() != "") {
    popularP.textContent = 'Resultados de búsqueda:'
    } else {
    popularP.textContent = 'Popular'
    }
    
    const filtered = allMovies.filter(movie =>
      movie.title && movie.title.toLowerCase().includes(searchTerm)
      
    )
    
    displaySearchResults(filtered)
  })
}

Heroes.addEventListener('click', () => {
  showTypeMovies(typeHeroe)
  showFilterSection()
  popularP.textContent = `Mostrar las de: Heroes`
})
Comedy.addEventListener('click', () => {
  showTypeMovies(typeComedy)
  showFilterSection()
  popularP.textContent = `Mostrar las de: Comedia`
})
Action.addEventListener('click', () => {
  showTypeMovies(typeAction)
  showFilterSection()
  popularP.textContent = `Mostrar las de: Accion`
})
Drama.addEventListener('click', () => {
  showTypeMovies(typeDrama)
  showFilterSection()
  popularP.textContent = `Mostrar las de: Drama`
})
all.addEventListener('click', () => {
  fetchAndRenderMovies(URL_POPULARES,popularMovies, true)
  showFilterSection()
  popularP.textContent = 'Popular'
})

close.addEventListener('click', showFilterSection)

filterButton.addEventListener('click', showFilterSection)
startApp()