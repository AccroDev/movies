<script setup>
    import { useGlobalStore } from '@/stores/GlobalStore';
    import { useMoviesStore } from '@/stores/MoviesStore';
    import axios from 'axios';
    import { defineProps, ref, onMounted, watch } from 'vue';

    const props = defineProps({
        shop: {
            type: Object,
            required: true
        },
        movieId: {
            type: Number,
            required: true
        }
    });
    const GlobalStore = useGlobalStore();
    const newPath = ref('');
    const sending = ref(false);
    const movieStore = useMoviesStore(); 
    watch(() => movieStore.pathMovieInShop[movieStore.MovieId], (newValue) => {
        if (newValue) {
            newPath.value = newValue[props.shop.id] ? newValue[props.shop.id].path : '';
        }
    });
    onMounted(() => {
        if (movieStore.pathMovieInShop[movieStore.MovieId]) {
            newPath.value = movieStore.pathMovieInShop[movieStore.MovieId][props.shop.id] ? movieStore.pathMovieInShop[movieStore.MovieId][props.shop.id].path : '';
        }
    }); 
    async function setNewPath() {
        if (sending.value === true) {
            return;
        }

        try {
            sending.value = true;
            const response = await axios.get(`${GlobalStore.apiHost}/api/update-shop-path`, {
                params: {
                    address: newPath.value,
                    shop: props.shop.id,
                    movie : props.movieId   
                }
            }); 
            sending.value = response.data.statut ? "success" : "error";
        } catch(e) {
            sending.value = "error";
            console.error('Error updating shop path:', e);
        }
    } 
</script>

<template>
  <div class="shopCard w-full overflow-hidden md:w-[47%] m-1 h-28 rounded flex">
    <div class="w-28 h-28 min-w-28 flex items-center justify-center shopMinia">
      <img :src="GlobalStore.apiHost + shop.miniature" class="w-full h-full object-contain" alt="">
    </div>
    <div class="flex flex-col ml-1 py-2 overflow-hidden">
      <h4 class="mb-auto font-semibold text-lg sm:text-sm titleShop"><strong>{{ shop.ville }} : </strong>{{ shop.name }}</h4>
      <div class="mx-1">
        <input v-model="newPath" class="w-full text-sm outline-none rounded-sm sm:text-xs py-[2px] px-1 border border-[#fdae5c] inpPath" type="text">
        <button @click="setNewPath" class="py-1 px-3 text-sm text-white bg-blue-500 rounded-sm sm:px-1 hover:opacity-85 transition-opacity duration-300 sm:text-xs mr-1 mt-1 saveUpBtn">Enregistrer</button> 
        <span class="inline-flex justify-center items-center" v-if="sending === true" >
            <span class="spinner inline-block w-4 h-4 border-2 mr-1 border-black border-b-2 border-b-transparent rounded-full" ></span>
        </span>
        <span v-else-if="sending === 'success'" class="inline-flex items-center justify-center fas fa-check" > </span>
        <span v-else-if="sending === 'error'" class="inline-flex items-center justify-center fas fa-errors" > </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 400px) {
  .saveUpBtn {
    padding: 1px 5px;
    font-size: 12px;
  }
  .inpPath {
    padding: 1px 5px;
    font-size: 12px;
  }
  .titleShop {
    font-size: 12px;
    line-height: 12px;
  }
}
</style>