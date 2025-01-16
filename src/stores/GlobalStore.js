import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const apiHost = ref("http://localhost:8001");//
  const movies = ref([]);
  const recommanded = ref([]);

  function setMovies(newMovies,setRecommanded = false) {
    setRecommanded ? recommanded.value = newMovies : movies.value = newMovies;
  }

  return { apiHost, movies, recommanded, setMovies };
});
