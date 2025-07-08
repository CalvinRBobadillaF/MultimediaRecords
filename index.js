// MOVIES
const API_KEY = 'a9077a7501dfc374b7121d2d4db264e6';
const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-EN&page=1`;
const URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_EN_CARTELERA = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
const URL_PROXIMAMENTE = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`;

let allpopular = []
let allComingSoon = []
let allTopRated = []
let allNowPlaying = []

//ANIME

const animeURL_Rated = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
const animeURL_TOP = `https://api.jikan.moe/v4/top/anime`
const animeURL_NOW = `https://api.jikan.moe/v4/seasons/now`
const animeURL_TOPmovie = `https://api.jikan.moe/v4/anime?type=movie`
  
let allPopularAnime = []
let allTopRatedAnime = []
let allSeasonAnime = []

//Music 
const musicKey = `dc3ba24e72af95c15356895c6af3766a`
const secret2 = `8aeb17b83fbe81dad0f33232c066077b`
const music_popular = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rock&api_key=dc3ba24e72af95c15356895c6af3766a&format=json
`
const electronicMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=electronic&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`
const popMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`
const indieMusic = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=indie&api_key=dc3ba24e72af95c15356895c6af3766a&format=json`

let allPop = []
let allIndie = []
let allRock = []
let allElectronic = []

//Books 

const apiKeyBooks = `AIzaSyC68sJrMbECwvuNsjcDjLCfYXBtjU_97qQ`
const volumes = `https://www.googleapis.com/books/v1/volumes`
const popularBooks = `https://www.googleapis.com/books/v1/volumes?q=bestsellers&orderBy=newest&key=${apiKeyBooks}`
const topRatedBooks = `https://www.googleapis.com/books/v1/volumes?q=most+popular+books&key=AIzaSyC68sJrMbECwvuNsjcDjLCfYXBtjU_97qQ`
const technologyBooks = `https://www.googleapis.com/books/v1/volumes?q=subject:technology&orderBy=relevance&key=AIzaSyC68sJrMbECwvuNsjcDjLCfYXBtjU_97qQ`
const psychologyBooks = `https://www.googleapis.com/books/v1/volumes?q=subject:psychology&orderBy=relevance&key=AIzaSyC68sJrMbECwvuNsjcDjLCfYXBtjU_97qQ`

let allPopularBooks = []
let allTopRatedBooks = []
let allTech = []
let allPsyschology = []


// DOM ID'S
const input = document.getElementById('input')
const popular = document.getElementById('popular-poster')
const comingSoon = document.getElementById('coming-soon')
const suggestion = document.getElementById('suggestions')
const topRated = document.getElementById('top-rated')
const main = document.getElementById('Main')
const header = document.getElementById('header')
const returnButton = document.getElementById('returnButton')
const contentDetails = document.getElementById('Content-details')
const showDetailsPoster = document.getElementById('showDetails-poster')
const sinopsis = document.getElementById('sinopsis')
const button = document.getElementById('details-button')
const title = document.getElementById('title')
const popularity = document.getElementById('popularity')
const rating = document.getElementById('rating')
const release = document.getElementById('release')
const comingSoonP = document.getElementById('coming-soonP')
const Filter = document.getElementById('Filter')
const Anime = document.getElementById('Anime')
const Movies = document.getElementById('Movies')
const Books = document.getElementById('Books')
const Music = document.getElementById('Music')
const popularP = document.getElementById('popular-p')
const link = document.getElementById('link')
const moreInfoButton = document.getElementById('more-info-button')

const topRatedP = document.getElementById('top-ratedP')
const suggestionP = document.getElementById('suggestionsP')

let genre_id = []

// Mostrar detalles de película
function displayDetails() {
  main.style.display = 'none'
  header.style.display = 'none'
  contentDetails.style.display = 'grid'
}

// Regresar a la pantalla principal
function returnToHome() {
  main.style.display = 'block'
  header.style.display = 'grid'
  contentDetails.style.display = 'none'
  
}

//Pedir datos a API.
async function fetchData(URL) {
  try {
  const res = await fetch(URL)
  const data = await res.json()
  if (data.results) return data.results // movies
  if (data.items) return data.items // books
  if (data.albums?.album) return data.albums.album // music
  if (data.data) return data.data // anime
  return []
  } catch (error) {
    alert('Hubo un error cargando algo, porfavor, reinicia la pagina.')
    console.error(error)
  }
}



// Renderizar y pedir datos a la API de TMDB
async function fetchAndRenderMovies(url, container, saveInMemory = false) {
  const movies = await fetchData(url)
  container.innerHTML = ""
  
  movies.forEach(movie => {
    const fullPoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    const img = document.createElement("img")
    img.src = fullPoster
    img.alt = movie.title
    
    container.appendChild(img)
    
    img.addEventListener("click", () => showDetailsFromMovie(movie))
    
  })

  if (saveInMemory) {
    if (url === URL_POPULARES) allpopular = movies
    else if (url === URL_PROXIMAMENTE) allComingSoon = movies
    else if (url === URL_TOP_RATED) allTopRated = movies
    else if (url === URL_EN_CARTELERA) allNowPlaying = movies
  }
}

//Renderizar y pedir datos a la API de google books.
async function fetchAndRenderBooks(url, container, saveInMemory = false) {
  const books = await fetchData(url)
  container.innerHTML = ""
  console.log(books)
  
  books.forEach(book => {
    const thumbnail = book.volumeInfo?.imageLinks?.smallThumbnail || ""
    const title = book.volumeInfo?.title || "Sin título"
    const img = document.createElement("img")
    img.src = thumbnail
    img.alt = title
    container.appendChild(img)
    img.addEventListener('click', () => {
      showDetailsFromBook(book)
    })


  })

  if (saveInMemory) {
    if (url === popularBooks) allPopularBooks = books
    else if (url === topRatedBooks) allTopRatedBooks = books
    else if (url === technologyBooks) allTech = books
    else if (url === psychologyBooks) allPsyschology = books
  }
}




  
//Mostrar y pedir datos a la api de jikan (anime)
  async function fetchAndRenderAnime(url, container) {
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

//Mostrar y pedir datos de la API de musica.
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

//Mostrar los detalles al hacer click a la API de musica
function showDetailsFromMusic(music) {
  showDetailsPoster.innerHTML = ''
  title.textContent = music.artist.name
  sinopsis.textContent = music.name
  console.log(music)
  const detailImg = document.createElement('img')
  detailImg.src = music.image[3]['#text'] || "imagen_no_disponible.jpg"
  detailImg.alt = music.name
  showDetailsPoster.appendChild(detailImg)
  
  rating.textContent = `Calificacion: No disponible :(`
  popularity.textContent = `Popularidad: No disponible :(`
  release.textContent = `Lanzamiento: No disponible :(`
    moreInfoButton.onclick = () => {
      const musicLink = `https://www.last.fm/music/${music.artist.name}`
      window.open(musicLink, '_blank')
    }
  displayDetails()
}


// Mostrar información en la vista de detalles de las peliculas.
function showDetailsFromMovie(movie) {
  showDetailsPoster.innerHTML = ''
  title.textContent = movie.title
  sinopsis.textContent = movie.overview
  console.log(movie)
  const detailImg = document.createElement('img')
  detailImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  detailImg.alt = movie.title
  showDetailsPoster.appendChild(detailImg)
  
  rating.textContent = `Popular vote: ${movie.popularity}`
  popularity.textContent = `rating: ${movie.vote_average}`
  release.textContent = `Original release: ${movie.release_date}`
  
  moreInfoButton.onclick = () => {
  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`
  window.open(tmdbLink, '_blank')
}
  
  displayDetails()
}

//Mostrar la informacion del libro a la que el usuario le da click.
function showDetailsFromBook(book) {
  showDetailsPoster.innerHTML = ''
  title.textContent = book.volumeInfo.title
  sinopsis.textContent = book.volumeInfo.description
  
  const detailImg = document.createElement('img')
  const thumbnail = book.volumeInfo?.imageLinks?.smallThumbnail || ""
  detailImg.src = thumbnail
  detailImg.alt = book.volumeInfo.title
  showDetailsPoster.appendChild(detailImg)
  
  rating.textContent = `rating: ${book.volumeInfo.averageRating}`
  popularity.textContent = `Category: ${book.volumeInfo.categories}`
  release.textContent = `released on: ${book.volumeInfo.publishedDate}`
  moreInfoButton.onclick = () => {
    const bookInfoLink = `https://play.google.com/store/books/details?id=${book.id}`
    window.open(bookInfoLink, '_blank')
  }
  displayDetails()
}

//Mostrar informacion en la lista de detalles de los animes.
function showDetailsFromAnime(anime) {
  showDetailsPoster.innerHTML = ''
  title.textContent = anime.title
  sinopsis.textContent = anime.synopsis

  
  const detailImg = document.createElement('img')
  detailImg.src = anime.images.jpg.image_url
  detailImg.alt = anime.title
  showDetailsPoster.appendChild(detailImg)
  
  rating.textContent = `Popular vote: ${anime.score}`
  popularity.textContent = `Favorite of: ${anime.favorites}`
  release.textContent = `Original release: ${anime.aired.from}`

  moreInfoButton.onclick = () => {
    const animeTrailer = anime.trailer.embed_url
    window.open(animeTrailer, '_blank')
  }
  displayDetails()
  
}

returnButton.addEventListener('click', returnToHome)

function display0results(list) {
  popular.innerHTML = ""
  
  if (list.length === 0) {
    popular.innerHTML = "<p>No se encontraron resultados.</p>"
    
    return
  }
}

// Buscar y mostrar resultados de peliculas
function displaySearchResultsMovies(list) {
  display0results(list)

  list.forEach(movie => {
    const img = document.createElement("img")
    img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    img.alt = movie.title
    img.id = movie.id
    popular.appendChild(img)
    img.addEventListener('click', () => showDetailsFromMovie(movie))
    
  })
}

//Mostrar los resultados del filtro de libros.
function displaySearchResultsMoviesBook(list) {
  display0results(list)
  list.forEach(book => {
    const thumbnail = book.volumeInfo?.imageLinks?.smallThumbnail || ""
    const title = book.volumeInfo?.title || "Sin título"
    const img = document.createElement("img")
    img.src = thumbnail
    img.alt = title
    popular.appendChild(img)
    img.addEventListener("click", () => showDetailsFromBook(book))
    
  })

  
}


//Mostrar y buscar resultados de los animes.
function displaySearchResultsMoviesAnime(list) {
  display0results(list)


  list.forEach(anime => {
    const img = document.createElement("img")
    img.src = anime.images.jpg.image_url
    img.alt = anime.title
    popular.appendChild(img)
    img.addEventListener('click', () => showDetailsFromAnime(anime))
    
  })

  
}

//Buscar y mostrar resultados de la musica.
function displaySearchResultsMusic(list) {
  display0results(list)

  list.forEach(music => {
    const img = document.createElement("img")
    img.src = music.image[3]['#text'] || "imagen_no_disponible.jpg"
    img.alt = music.name
    popular.appendChild(img)
    img.addEventListener('click', () => showDetailsFromMusic(music))
    
  })

  
}



// Inicializar peliculas
async function moviesStart() {
  await fetchAndRenderMovies(URL_POPULARES, popular, true)
  await fetchAndRenderMovies(URL_PROXIMAMENTE, comingSoon, true)
  await fetchAndRenderMovies(URL_EN_CARTELERA, suggestion, true)
  await fetchAndRenderMovies(URL_TOP_RATED, topRated, true)

  const allMovies = [
      ...allpopular,
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
    
    displaySearchResultsMovies(filtered)
  })
}

//Inicializar anime
async function animeStart() {
  await fetchAndRenderAnime(animeURL_TOP, popular)
  await fetchAndRenderAnime(animeURL_NOW, suggestion)
  await fetchAndRenderAnime(animeURL_Rated, topRated)
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
    displaySearchResultsMoviesAnime(filtered)
  })
}

//Inicializar musica
async function musicStart() {
  await fetchAndRenderMusic(music_popular, popular, true)
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

//Inicializar libros.
async function bookStart() {
  await fetchAndRenderBooks(popularBooks, popular, true)
  await fetchAndRenderBooks(topRatedBooks, topRated, true)
  await fetchAndRenderBooks(technologyBooks, comingSoon, true)
  await fetchAndRenderBooks(psychologyBooks, suggestion, true)

  const allBooks = [
      ...allPopularBooks,
      ...allTopRatedBooks,
      ...allPsyschology,
      ...allTech
    ]

console.log("Total libros cargadas:", allBooks.length)
  input.addEventListener("input", () => {
    
    const searchTerm = input.value.toLowerCase()
    if (searchTerm.trim() != "") {
    popularP.textContent = 'Resultados de búsqueda:'
    } else {
    popularP.textContent = 'Popular'
    
    }
    console.log("Buscando:", searchTerm)
    const filtered = allBooks.filter(book => 
      book.volumeInfo.title && book.volumeInfo.title.toLowerCase().includes(searchTerm)
      
    )
    console.log(filtered)
    displaySearchResultsMoviesBook(filtered)
  })
}


Movies.addEventListener('click', () => {
  moviesStart()
  comingSoon.style.display = 'flex'
  comingSoonP.textContent = 'Coming soon'
  suggestionP.textContent = 'suggestions'
  returnToHome()
})
Anime.addEventListener('click', () => {
  animeStart()
  popularP.textContent = `Popular`
  comingSoonP.textContent = `Coming Soon`
  suggestionP.textContent = `Suggestions `
  topRatedP.textContent = `Top Rated`
  returnToHome()

})
Books.addEventListener('click', () => {
  bookStart()
  popularP.textContent = `Popular`
  comingSoonP.textContent = `Tech & science`
  suggestionP.textContent = `Psychology `
  topRatedP.textContent = `Top Rated`
  comingSoon.style.display = 'flex'
  returnToHome()
  
})
Music.addEventListener('click', () => {
  musicStart()
  popularP.textContent = `Rock`
  comingSoonP.textContent = `Electronic`
  suggestionP.textContent = `Pop`
  topRatedP.textContent = `Indie`
  comingSoon.style.display = 'flex'
  returnToHome()
})

moviesStart()