// ENLACES DE LOS DATOS REQUERIDOS
const API_KEY = 'a9077a7501dfc374b7121d2d4db264e6';
const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-EN&page=1`;
const URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_EN_CARTELERA = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_PROXIMAMENTE = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`;

//ANIME

const animeURL_POPULARITY = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
const animeURL_TOP = `https://api.jikan.moe/v4/top/anime`
const animeURL_NOW = `https://api.jikan.moe/v4/seasons/now`
const animeURL_TOPmovie = `https://api.jikan.moe/v4/anime?type=movie`
  

//Music 
const musicKey = `dc3ba24e72af95c15356895c6af3766a`
const secret2 = `8aeb17b83fbe81dad0f33232c066077b`
//const music_popular = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=michaeljackson&api_key=dc3ba24e72af95c15356895c6af37https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rock&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`
const music_popular = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rock&api_key=dc3ba24e72af95c15356895c6af3766a&format=json
`
const electronicMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=electronic&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`
const popMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`
const indieMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`

let allPop = []
let allIndie = []
let allRock = []
let allElectronic = []
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
const comingSoonP = document.getElementById('coming-soonP')
const Filter = document.getElementById('Filter')
const AnimeId = document.getElementById('Anime')
const Movies = document.getElementById('Movies')
const Books = document.getElementById('Books')
const Music = document.getElementById('Music')
const popularP = document.getElementById('popular-p')
const all = document.getElementById('All')
const close = document.getElementById('close')
const topRatedP = document.getElementById('top-ratedP')
const suggestionP = document.getElementById('suggestionsP')



const typeHeroe = 28
const typeComedy = 35
const typeAction = 878
const typeDrama = 18

let allPopularMovies = []
let allComingSoon = []
let allTopRated = []
let allNowPlaying = []

let allPopularAnime = []
let allTopRatedAnime = []
let allSeasonAnime = []

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
  
  async function fetchAndRenderAnime(url, container, saveInMemory = false) {
  const response = await fetch(url)
  const data = await response.json()
  const animes = data.data
    console.log(animes)
  container.innerHTML = ""

  animes.forEach(anime => {
    const fullPoster = anime.images.jpg.image_url
    const img = document.createElement("img")
    img.src = fullPoster
    img.alt = anime.title
    container.appendChild(img)

    img.addEventListener('click', () => {
      showDetailsFromAnime(anime)
    })
  })

  if (url.includes('top/anime')) {
  allTopRatedAnime = animes
} else if (url.includes('bypopularity')) {
  allPopularAnime = animes
} else if (url.includes('seasons/now')) {
  allSeasonAnime = animes
}
}

async function fetchAndRenderMusic(url, container, saveInMemory = false) {
  
  const response = await fetch(url)
  const data = await response.json()

  const albums = data.albums?.album // <- ahora es "albums", no "topalbums"
  if (!albums) {
    console.error("No se pudieron cargar los álbumes", data)
    return
  }
console.log(albums)
  
  container.innerHTML = ""

  albums.forEach(album => {
    const fullPoster = album.image[3]['#text'] || "imagen_no_disponible.jpg"
    const img = document.createElement('img')
    img.src = fullPoster
    img.alt = album.name
    container.appendChild(img)
    img.addEventListener('click', () => {
      showDetailsFromMusic(album)
    })
  })

  if (saveInMemory) {
    if (url === popMusic) allPop = albums
    else if (url === music_popular) allRock = albums
    else if (url === indieMusic) allIndie = albums
    else if (url === electronicMusic) allElectronic = albums
  }
}

function showDetailsFromMusic(music) {
  showDetailsPoster.innerHTML = ''
  title.textContent = music.artist.name
  sinopsis.textContent = music.name

  const detailImg = document.createElement('img')
  detailImg.src = music.image[3]['#text'] || "imagen_no_disponible.jpg"
  detailImg.alt = music.name
  showDetailsPoster.appendChild(detailImg)
  
  calification.textContent = `Calificacion: No disponible :(`
  popularity.textContent = `Popularidad: No disponible :(`
  release.textContent = `Lanzamiento: No disponible :(`
  
  displayDetails()
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

function showDetailsFromAnime(anime) {
  showDetailsPoster.innerHTML = ''
  title.textContent = anime.title
  sinopsis.textContent = anime.synopsis

  
  const detailImg = document.createElement('img')
  detailImg.src = anime.images.jpg.image_url
  detailImg.alt = anime.title
  showDetailsPoster.appendChild(detailImg)
  
  calification.textContent = `Popular vote: ${anime.score}`
  popularity.textContent = `Favorite of: ${anime.favorites}`
  release.textContent = `Original release: ${anime.aired.from}`
  
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

function displaySearchResultsAnime(list) {
  popularMovies.innerHTML = ""
  
  if (list.length === 0) {
    popularMovies.innerHTML = "<p>No se encontraron resultados.</p>"
    
    return
  }


  list.forEach(anime => {
    const img = document.createElement("img")
    img.src = anime.images.jpg.image_url
    img.alt = anime.title
    popularMovies.appendChild(img)
    img.addEventListener('click', () => showDetailsFromAnime(anime))
    
  })

  
}

function displaySearchResultsMusic(list) {
  popularMovies.innerHTML = ""
  
  if (list.length === 0) {
    popularMovies.innerHTML = "<p>No se encontraron resultados.</p>"
    
    return
  }


  list.forEach(music => {
    const img = document.createElement("img")
    img.src = music.image[3]['#text'] || "imagen_no_disponible.jpg"
    img.alt = music.name
    popularMovies.appendChild(img)
    img.addEventListener('click', () => showDetailsFromMusic(music))
    
  })

  
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

async function animeStart() {
  await fetchAndRenderAnime(animeURL_TOP, popularMovies)
  await fetchAndRenderAnime(animeURL_NOW, suggestion)
  await fetchAndRenderAnime(animeURL_POPULARITY, topRated)
  comingSoonP.textContent = ` `
  comingSoon.style.display = 'none'

  const allAnime = [
      ...allPopularAnime,
      ...allSeasonAnime,
      ...allTopRatedAnime
      
    ]
console.log("Total animes cargados:", allAnime.length)
  input.addEventListener("input", () => {
    
    const searchTerm = input.value.toLowerCase()
    if (searchTerm.trim() != "") {
    popularP.textContent = 'Resultados de búsqueda:'
    } else {
    popularP.textContent = 'Popular'
    }
    console.log("Buscando:", searchTerm)
    const filtered = allAnime.filter(anime =>
      anime.title_english && anime.title_english.toLowerCase().includes(searchTerm)
      
    )
    console.log(filtered)
    displaySearchResultsAnime(filtered)
  })
}

async function musicStart() {
  await fetchAndRenderMusic(music_popular, popularMovies, true)
  await fetchAndRenderMusic(electronicMusic, suggestion, true)
  await fetchAndRenderMusic(popMusic, comingSoon, true)
  await fetchAndRenderMusic(indieMusic, topRated, true)

  const allMusic = [
      ...allIndie,
      ...allRock,
      ...allPop,
      ...allElectronic
      
    ]
console.log("Total canciones cargadas:", allMusic.length)
  input.addEventListener("input", () => {
    
    const searchTerm = input.value.toLowerCase()
    if (searchTerm.trim() != "") {
    popularP.textContent = 'Resultados de búsqueda:'
    } else {
    popularP.textContent = 'Pop'
    }
    console.log("Buscando:", searchTerm)
    const filtered = allMusic.filter(music =>
      music.name && music.name.toLowerCase().includes(searchTerm)
      
    )
    console.log(filtered)
    displaySearchResultsMusic(filtered)
  })
}

Movies.addEventListener('click', () => {
  startApp()
  comingSoon.style.display = 'flex'
  comingSoonP.textContent = 'Coming soon'
})
AnimeId.addEventListener('click', () => {
  animeStart()
  popularP.textContent = `Popular`
  comingSoonP.textContent = `Coming Soon`
  suggestionP.textContent = `Suggestions `
  topRatedP.textContent = `Top Rated`

})
Books.addEventListener('click', () => {
  showTypeMovies(typeAction)
  
  popularP.textContent = `Mostrar las de: Accion`
})
Music.addEventListener('click', () => {
  musicStart()
  popularP.textContent = `Rock`
  comingSoonP.textContent = `Electronic`
  suggestionP.textContent = `Pop`
  topRatedP.textContent = `Indie`
  comingSoon.style.display = 'flex'
  
})
all.addEventListener('click', () => {
  fetchAndRenderMovies(URL_POPULARES,popularMovies, true)
  
  popularP.textContent = 'Popular'
})

close.addEventListener('click', showFilterSection)

filterButton.addEventListener('click', showFilterSection)
startApp()