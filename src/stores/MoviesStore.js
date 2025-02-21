import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useGlobalStore } from './GlobalStore';

export const useMoviesStore = defineStore('movies', () => {
  const globalStore = useGlobalStore();
  const DisplayAddInShop = ref(false);
  const MoviesInShop = ref({});
  const MovieId = ref(false);
  const fetchingPath = ref(false);
  const fetchingMovieInShop = ref([]); 

  function setDisplayAddInShop(newValue, id = false) {
    DisplayAddInShop.value = newValue;
    MovieId.value = id;
  }

  /**
   * Fetcher les ids et path des movies disponible dans la boutique passer en params, et les ajouters dans l'array MoviesInShop
   * 
   * @param {number} shopId - ID de la boutique 
   * @returns {void} - met juste à jour la ref MoviesInShop
   */
  async function fetchMoviesInShop(shopId) {     
    // on ne vérifie pas le MoviesInShop.value[shopId] car il vient d'etre mis à jours
    if (!shopId || fetchingMovieInShop.value.includes(shopId)) {
      return;
    }   
    // dire que nous somme entrain de fetcher les datas de cette boutique
    fetchingMovieInShop.value.push(shopId);
      
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/getMovieIdShop`, {
        params: { shop: shopId }
      });
      MoviesInShop.value[shopId] = response.data;
      fetchingMovieInShop.value = fetchingMovieInShop.value.filter((id) => id !== shopId);
     
    } catch (error) {
      console.error('Error fetching movies in shop:', error);
      fetchingMovieInShop.value = fetchingMovieInShop.value.filter((id) => id !== shopId);
    }
    return true;
  } 

  /* lorsqu'on selectionne les shop dans search ou homePage */
  const SelectedSearchShop = ref(false); 
  const selectedShop = ref('');
  const setSelectedShop = async (value,isSearch = false) => { 
    if (isSearch) { SelectedSearchShop.value = value } else { selectedShop.value = value }  
    fetchMoviesInShop(isSearch ? SelectedSearchShop.value.id : selectedShop.value.id); 
  };

  function setFetchingPath(newValue) {
    fetchingPath.value = newValue;
  }


  const pathMovieInShop = ref({});

  function setpathMovieInShop(key,newValue) {
    pathMovieInShop.value[key] = newValue;
  }

  const MoviesInFolder = ref({});
  function setMoviesInFolder(id, value) {
    MoviesInFolder.value[id] = value;
  }

  return { 
    pathMovieInShop, 
    setpathMovieInShop, 
    DisplayAddInShop, 
    setDisplayAddInShop, 
    MoviesInShop, 
    MovieId, 
    fetchingPath, 
    setFetchingPath, 
    fetchMoviesInShop,  
    MoviesInFolder,
    setMoviesInFolder,
    //selected of shop
    selectedShop, 
    SelectedSearchShop,
    setSelectedShop, 
  };
});
