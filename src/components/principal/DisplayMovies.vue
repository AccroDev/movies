<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import MoviesCard from '../Cards/MoviesCard.vue';
import { useGlobalStore } from '../../stores/GlobalStore';

const globalStore = useGlobalStore();
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);

async function fetchMovies() {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const response = await axios.get(`${globalStore.apiHost}/api/movies`, {
      params: { 
        page: page.value,  
        ville : globalStore.selectedVille,
        shop : globalStore.selectedShop,
        type : globalStore.selectedType,
        onlyAvailable : globalStore.onlyAvailable 
      }
    });
    if (response.data.length < 1) {
      hasMore.value = false;
    }
    globalStore.setMovies([...globalStore.movies, ...response.data]);
    page.value++;
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchMovies();
});

watch(() => globalStore.movies.length, (newLength) => { 
    setTimeout(() => {
        if (newLength >= 10) {
            const movieCards = document.querySelectorAll('.movie-card');
            const tenthLastMovie = movieCards[movieCards.length - 10];  
            if (tenthLastMovie) { 
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                      fetchMovies();
                    }
                });
                observer.observe(tenthLastMovie);
            }
        }
    }, 300);
});
</script>

<template>
  <section class="my-3">
    <div class="intro flex justify-center items-center flex-col mb-10">
      <h3 class="font-semibold text-4xl text-center">Rétrouver tout nos <span class="text-violet-950">Movies</span> ici</h3>
      <p class="text-center text-xs opacity-65 w-1/2">Vous recherchez un Film ou une serie à regarder ? Faites vous plaisir...</p>
    </div>
    <div class="flex justify-center">
      <div class="mx-1 flex flex-wrap justify-center sm:justify-start sm:max-w-[95%] md:max-w-[701px] max-w-full w-full">
        <MoviesCard v-for="movie in globalStore.movies" :key="movie.id" :movie="movie" class="movie-card" pathName="description" />
      </div>
    </div>
    <div class="my-8" v-if="loading">
      <span class="spinner w-10 h-10 border-t-2 border-b-2 border-l-2 border-black border-r-2 border-r-transparent rounded-full flex justify-center items-center mx-auto mb-2"></span>
      <strong class="text-center w-full inline-block">Chargement...</strong>
    </div>
  </section>
</template>

<style>

</style>