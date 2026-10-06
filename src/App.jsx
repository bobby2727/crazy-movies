import React, {useState, useEffect} from 'react'
import "./App.css"
import mockMovies from './data/mockMovies';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import Header from "./components/Header"
const MOVIES_INITIAL = 20
const MOVIES_PER_LOAD = 10

const App = () => {
  const[movies, setMovies] = useState([]);
  const[visibleCount, setVisibleCount] = useState(MOVIES_INITIAL);
  const[modalMovie, setmodalMovie] = useState(null);
  const[searchTerm, setSearchTerm] = useState("");
  const[sortYear, setSortYear] = useState(null);
  const[darkMode, setDarkMode] = useState(false);

  useEffect(()=>{

    setMovies(mockMovies)

  }, [])

  function handleLoadMore(){
    setVisibleCount((prev)=> prev + MOVIES_PER_LOAD);
  }
  const filteredMovies = movies.filter((movie)=> movie.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if(sortYear === "asc"){
    filteredMovies.sort((a, b)=> a.year - b.year)
  }else if(sortYear === "desc"){
    filteredMovies.sort((a, b)=> b.year - a.year)
  }

  const visibleMovies = filteredMovies.slice(0, visibleCount)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header searchTerm = {searchTerm} setSearchTerm={setSearchTerm} sortYear={sortYear} setSortYear={setSortYear} darkMode = {darkMode} setDarkMode = {setDarkMode}/>
      <div className='movie-list'>
        {
          visibleMovies.map((movie)=>(
            <MovieCard key={movie.id} movie={movie} openModal={setmodalMovie}/>
          ))
        }
        

      </div>
      {
        visibleMovies.length < movies.length &&(
          <div className='load-more-container'>
            <button onClick={handleLoadMore} className='load-more-btn'>Show More</button>
          </div>
        ) 
      }
      {
        modalMovie && (
          <MovieModal movie={modalMovie} closeModal ={()=> setmodalMovie(null)} />
        )
      }

    </div>
  )
}

export default App