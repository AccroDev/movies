import { ref } from 'vue';
import { defineStore } from 'pinia'; 

export const useMoviesStore = defineStore('movies', () => { 
  const DisplayAddInShop = ref(false); 
  function setDisplayAddInShop(newValue, id = false) { 
    DisplayAddInShop.value = newValue; 
    MovieId.value = id; 
  } 

  const MoviesInShop = ref({}); // const c = [ {id: 1, movie : 2, exist : false, path : 'path'}]
  const MovieId = ref(false); 
  const fetchingPath = ref(false);

  function setMovieInShop(key,newValue) {
    MoviesInShop.value[key] = newValue;
  }
  function setFetchingPath(newValue) {
    fetchingPath.value = newValue;
  } 

  return { DisplayAddInShop, setDisplayAddInShop, MoviesInShop, setMovieInShop, MovieId, fetchingPath, setFetchingPath };
});
