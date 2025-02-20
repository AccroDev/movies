<script setup>
import { watch } from 'vue';
import axios from 'axios';
import MoviesCard from '../Cards/MoviesCard.vue';
import { useGlobalStore } from '../../stores/GlobalStore';
import { useSearchStore } from '../../stores/SearchStore';

const globalStore = useGlobalStore();
const searchStore = useSearchStore();

watch(() => searchStore.search, async (newValue) => {
  if (newValue && newValue === 1) {
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/search`, {
        params: {
          query: searchStore.query,
          type: 'a',
          ville : searchStore.selectedVille,
          shop : searchStore.selectedShop.id,
          found : JSON.stringify(searchStore.foundMovies) 
        }
      });
      searchStore.setResults(response.data,"a"); // to put in otherResult
      searchStore.setSearch(2); // Set search flag to 2 for the movieDb search
    } catch (error) {
      searchStore.setSearch(2); // Set search flag to 2 for the movieDb search
      console.error('Error fetching search results:', error);
    } 
  }
});
</script>

<template>
  <section class="my-3 px-2" v-if="searchStore.otherResults.length > 0" >
    <div class="mb-10">
      <h3 class="font-semibold text-2xl border-b-2 border-[#fdae5c] max-w-max pb-1">Autres Resultats</h3>
    </div>
    <div class="flex justify-center w-full">
      <div class="flex flex-wrap justify-start w-full">
        <MoviesCard pathName="searchDescription" store="search-other" v-for="result in searchStore.otherResults" :key="result.id" :movie="result" />
      </div>
    </div>
  </section>
</template>

<style>
</style>