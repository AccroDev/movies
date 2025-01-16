<script setup>
import { onMounted } from 'vue';
import MoviesCard from '../Cards/MoviesCard.vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchHistory();
});
</script>

<template>
  <section class="max-w-3xl mx-auto p-2 md:p-0">
    <h3 class="font-semibold text-lg border-b-4 border-[#fdae5c] max-w-max">Historique</h3>
    <div class="mt-3 flex flex-wrap">
      <MoviesCard v-for="movie in authStore.historyMovies" :key="movie.id" :movie="movie" pathName="profilDescription" store="history" />
    </div>
  </section>
</template>

<style>
</style><style>
</style>