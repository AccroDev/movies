<script setup>
import { ref, onMounted } from 'vue';
import ShopCard from '../Cards/ShopCard.vue';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useRoute } from 'vue-router';
import axios from 'axios';

const globalStore = useGlobalStore();
const route = useRoute();
const selectedVille = ref('');
const shops = ref([]);
const showTown = ref(false);
const classTownsElements = ref("hidden");
const fetching = ref("notYet");

onMounted(async () => {
  await globalStore.fetchVilles();
});

function ToggleTown() {
  showTown.value = !showTown.value;
  if (showTown.value) {
    classTownsElements.value = "scale-y-0";
    setTimeout(() => {
      classTownsElements.value = "scale-y-100";
    }, 3);
  } else {
    classTownsElements.value = "scale-y-0";
    setTimeout(() => {
      classTownsElements.value = "hidden";
    }, 300);
  }
}

async function fetchShops() {
  if (!selectedVille.value || fetching.value === true) return;

  try {
    fetching.value = true;
    const response = await axios.get(`${globalStore.apiHost}/api/movie-shops-by-ville`, {
      params: {
        ville: selectedVille.value,
        movie: route.params.id
      }
    });
    fetching.value = false;
    shops.value = response.data;
  } catch (error) {
    fetching.value = 'Error';
    console.error('Error fetching shops:', error);
  }
}
</script>

<template>
  <div class="w-full min-h-48 px-2 py-3 movieShopsDesc">
    <h3 class="text-base pb-1 border-b-4 w-max border-black font-medium">Selectionner une Ville</h3>
    <form @submit.prevent="fetchShops" method="post" class="flex items-end flex-wrap">
      <div class="border border-[#feebd6] rounded-md h-12 w-full sm:w-60 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown()">
        <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
          <h5 class="font-semibold text-lg uppercase filterTitle ">{{ selectedVille || 'Choisir une ville' }}</h5>
          <span class="fas fa-arrow-down font-semibold"></span>
        </div>
        <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements">
          <li v-for="ville in globalStore.villes" :key="ville.id" @click="selectedVille = ville.name" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">{{ ville.name }}</li>
        </ul>
      </div>
      <button class="text-white bg-blue-500 rounded px-2 py-1 hover:opacity-85 transition-opacity duration-300 text-base ml-2 mt-2"><i class="fas fa-search"></i> Rechercher</button>
    </form>

    <h3 class="text-base pb-1 mt-2 mb-4 border-b-4 w-max border-black font-medium">Resultats</h3>

    <div class="flex flex-wrap">

      <span v-if="fetching === true" class="spinner w-14 h-14 border-t-2 border-b-2 border-l-2 border-black border-r-2 border-r-transparent rounded-full flex justify-center items-center mx-auto my-5 mb-2"></span>
      
      <div v-else-if="fetching === false && selectedVille !== '' && shops.length < 1" >
        Aucune Boutique de transfert trouver dans cette ville.
      </div>

      <div v-else  class="flex flex-wrap">
        <ShopCard v-for="shop in shops" :key="shop.id" :shop="shop" />
      </div>

    </div>
  </div>
</template>

<style>
@media screen and (max-width: 350px) {
  .filterItem {
    width: 100%;
  }
}
</style>