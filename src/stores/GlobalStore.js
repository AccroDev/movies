import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useMoviesStore } from './MoviesStore';

export const useGlobalStore = defineStore('global', () => {
  const apiHost = ref(""); //http://movies
  const movies = ref([]);
  const recommanded = ref([]);
  const villes = ref([]);
  const shopsByVille = ref({}); 
  const selectedVille = ref('');  
  const selectedType = ref('');
  const onlyAvailable = ref(false);

  const movieStore = useMoviesStore();


  const scriptLoading = ref(false) ;
  const setScriptLoading =(newValue) => { scriptLoading.value = newValue }
 

  function setMovies(newMovies, setRecommanded = false) {
    setRecommanded ? recommanded.value = newMovies : movies.value = newMovies;
  }

  async function fetchVilles() {
    if (villes.value.length > 0) {
      return;
    }
    try {
      const response = await axios.get(`${apiHost.value}/api/allVilles`);
      villes.value = response.data;
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
  }

  async function fetchShopsByVille(ville) {
    if (shopsByVille.value[ville]) {
      return;
    }
    try {
      const response = await axios.get(`${apiHost.value}/api/get-shops-by-ville`, {
        params: { ville }
      });
      shopsByVille.value[ville] = response.data;
    } catch (error) {
      console.error('Error fetching shops by ville:', error);
    }
  } 

  const selectedShop = ref('');
  const setSelectedShop = async (value) => { 
    let resp = await movieStore.fetchMoviesInShop(value.id);
    selectedShop.value = value;
  };

  const updatingFiltre = ref(false); 
  async function setFilter() {
    updatingFiltre.value = true;
    try {
      const response = await axios.get(`${apiHost.value}/api/movies`, {
        params: {
          ville: selectedVille.value,
          shop: selectedShop.value && selectedShop.value != "" && selectedShop.value.id ? selectedShop.value.id : "",
          type: selectedType.value,
          available: onlyAvailable.value
        }
      });
      updatingFiltre.value = false;
      setMovies(response.data); 
    } catch (error) {
      updatingFiltre.value = false;
      console.error('Error fetching movies:', error);
    } 
  }


  return {
    apiHost,
    movies,
    updatingFiltre,
    setFilter,
    recommanded,
    villes,
    shopsByVille,
    selectedVille,
    selectedType,
    selectedShop,
    setSelectedShop,
    onlyAvailable,
    setMovies,
    fetchVilles,
    fetchShopsByVille, 
    scriptLoading,
    setScriptLoading
  };
});
