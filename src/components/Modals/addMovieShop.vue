<script setup>
import UpdateMovieInShop from '../Cards/UpdateMovieInShop.vue';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useMoviesStore } from '@/stores/MoviesStore';
import { useGlobalStore } from '@/stores/GlobalStore';

const emits = defineEmits(["closeAddModal"]);
const authStore = useAuthStore(); 
const movieStore  = useMoviesStore();
const globalStore = useGlobalStore();

async function fetchAdress() { 
    if (movieStore.MoviesInShop[movieStore.MovieId]) {
        return;
    }       
    try { 
        movieStore.setFetchingPath(true);
        const response = await axios.get(`${globalStore.apiHost}/api/get-movies-in-shop/${movieStore.MovieId}`); 
        movieStore.setMovieInShop(movieStore.MovieId, response.data);  
        movieStore.setFetchingPath(false);
    } catch (error) {  
        movieStore.setFetchingPath(false);
        console.error('Error fetching movies in shop:', error); 
    }
}

onMounted(async () => {
    if (authStore.userShops.length === 0) {
        await authStore.fetchUserShops();
    } 
    fetchAdress()  
});
</script>

<template>
  <section @click="emits('closeAddModal')" class="fixed top-0 left-0 bottom-0 right-0 bg-black/80 w-full h-full z-20 flex justify-center items-center">
    <div @click.stop class="bg-white rounded-md w-[95%] sm:w-4/5 max-w-2xl h-[90%] overflow-hidden flex justify-center items-center p-2 sm:p-4 addShopWrapper relative">
      <div class="w-full max-h-full overflow-y-auto overflow-x-hidden">
        <h2 class="text-2xl font-bold mb-6 mt-8 sm:mt-4 text-center text-back">Modifier Dans Nos Boutiques</h2>
        <div class="flex flex-wrap items-center">
          <UpdateMovieInShop v-for="shop in authStore.userShops" :key="shop.id" :shop="shop" :movieId="parseInt(movieStore.MovieId) " />
        </div>
      </div>
      <button @click="emits('closeAddModal')" class="absolute top-2 right-1 rounded-sm px-3 py-1 text-xs bg-red-950 opacity-80 text-white font-medium hover:opacity-60 duration-300">Fermer</button>
    </div>
  </section>
</template>

<style>
</style>