<script setup>
import CarouselCard from "@/components/Cards/CarouselCard.vue";
import Carousel from "@/assets/script/carouselle";
import { onMounted, ref } from "vue";
import axios from 'axios';
import { useGlobalStore } from '../../stores/GlobalStore';

const globalStore = useGlobalStore(); 
const hiddenContainer = ref(true);

async function fetchRecommendedMovies() {
  try {
    const response = await axios.get(`${globalStore.apiHost}/api/top-recommended`); 
    globalStore.setMovies(response.data,true)
    setTimeout(() => {
        createCarousel();
    }, 300);
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
  }
}

onMounted(() => {
  fetchRecommendedMovies();
});

function createCarousel() { 
  new Carousel(document.getElementById("recommandation"), {
    slidesToScroll: 1,
    slidesVisible: 1,
    pagination: false,
    showOthers: false,
    infinite: false,
    touch: true
  });
  hiddenContainer.value = false;
}
</script>

<template>
  <!-- sm:w-[620px] md:max-w-[701px] md:w-[684px] -->
  <div :class="hiddenContainer && globalStore.recommanded.length > 0  ? 'hidden' : 'block'" class="w-full mx-auto sm:w-[95%] sm:max-w-[95%] md:max-w-[701px] md:w-[701px]" id="recommandation">
    <CarouselCard v-for="movie in globalStore.recommanded" :key="movie.id" :movie="movie" />
    <div class="h-full min-h-64 md:min-h-[450px] md:h-[450px]" v-if="globalStore.recommanded.length < 1" >
      lorem
    </div>
  </div>
</template>

<style>
</style>