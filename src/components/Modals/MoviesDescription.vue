<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useDescriptStore } from '@/stores/DescriptStore';
import { useGlobalStore } from '@/stores/GlobalStore';

const route = useRoute();
const descriptStore = useDescriptStore();
const globalStore = useGlobalStore();

onMounted(async () => {
  const movieData = descriptStore.getMovieData(route.params.id);
  if (!movieData) {
    try {
      const response = await axios.get(`${globalStore.apiHost}/api/movie/${route.params.id}`);
      descriptStore.setMovieData(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }
});
</script>

<template>
  <section v-if="descriptStore.getMovieData(route.params.id)" class="bg-[#4b38d2] text-white">
    <img class="object-cover mb-5 w-full" :src="descriptStore.getMovieData(route.params.id).miniature" :alt="descriptStore.getMovieData(route.params.id).titre">
    <div class="my-0 mx-auto pt-0 px-1 pb-5">
      <p class="text-justify mb-5">{{ descriptStore.getMovieData(route.params.id).description }}</p>
      <div class="pl-5">
        <p class="mb-3">Date de première diffusion : {{ descriptStore.getMovieData(route.params.id).date }}</p>
        <p class="mb-3">Note moyenne : {{ descriptStore.getMovieData(route.params.id).vote }}</p>
      </div>
      <div class="mb-5">
        <p>Genres :</p>
        <span v-for="genre in descriptStore.getMovieData(route.params.id).genres" :key="genre.id" class="inline-flex mr-3 bg-[#5b49db] px-2 justify-center items-center flex-col rounded-sm">{{ genre.name }}</span>
      </div>
      <div class="mb-5">
        <p>Créateurs :</p>
        <div v-for="creator in descriptStore.getMovieData(route.params.id).creators" :key="creator.id" class="inline-flex mr-3 py-1 px-2 justify-center items-center flex-col">
          <img :src="creator.profile_path ? `https://image.tmdb.org/t/p/w500${creator.profile_path}` : '/src/assets/img/avatar.jpg'" class="w-36 object-contain rounded" :alt="creator.name">
          <p>{{ creator.name }}</p>
        </div>
      </div>
      <div class="mb-5">
        <p>Saisons :</p>
        <div v-for="season in descriptStore.getMovieData(route.params.id).seasons" :key="season.id" class="inline-flex mr-3 py-1 px-2 justify-center items-center flex-col">
          <img :src="`https://image.tmdb.org/t/p/w500${season.poster_path}`" class="w-36 object-contain rounded" :alt="season.name">
          <p>{{ season.name }}</p>
          <p>{{ season.overview }}</p>
        </div>
      </div>
    </div>
  </section>
</template>