<script setup>
import { watch } from 'vue';
import axios from 'axios';
import MoviesCard from '../Cards/MoviesCard.vue';
import { useGlobalStore } from '../../stores/GlobalStore';
import { useSearchStore } from '../../stores/SearchStore';

const globalStore = useGlobalStore();
const searchStore = useSearchStore();

watch(() => searchStore.search, async (newValue) => {
  if (newValue && newValue === true) {
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/search`, {
        params: {
          query: searchStore.query,
          type: 'p'
        }
      }); 
      searchStore.setResults(response.data);
      searchStore.setSearch(1); // set search flag to 1 for another search
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
});
</script>

<template>
  <section class="my-3 px-2" v-if="searchStore.results.length > 0">
    <div class="mb-10">
      <h3 class="font-semibold text-2xl border-b-2 border-[#fdae5c] w-max pb-1">Resultats</h3>
    </div>
    <div class="flex justify-center w-full">
      <div class="flex flex-wrap justify-start w-full">
        <MoviesCard pathName="searchDescription" store="searc-principal" v-for="result in searchStore.results" :key="result.id" :movie="result" />
      </div>
    </div>
  </section>
</template>

<style>
</style>