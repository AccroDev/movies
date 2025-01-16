import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const query = ref('');
  const search = ref(false);
  const results = ref([]);
  const otherResults = ref([]);
  const thdbResults = ref([]);
  const foundMovies = ref([]);
  const foundTmbMovies = ref([]);

  function setQuery(newQuery) {
    query.value = newQuery;
  }
  function setSearch(newValue) {
    search.value = newValue;
  }

  function setResults(newResults, type = 'p') {
    type === "p" ? results.value = newResults : type === "a" ? otherResults.value = newResults : thdbResults.value = newResults;
    foundMovies.value = newResults.map(result => result.id);

    const resFound = results.value.filter(result => result.idTmdb);
    const otherResultsFound = otherResults.value.filter(result => result.idTmdb);
    foundTmbMovies.value = [...resFound, ...otherResultsFound].map(result => result.idTmdb);
  }

  return { query, setSearch, search, results, foundTmbMovies, otherResults, thdbResults,  setQuery, setResults, foundMovies };

});
