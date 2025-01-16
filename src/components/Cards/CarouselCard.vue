<script setup> 

    import { RouterLink } from 'vue-router';
    import { ref, defineProps } from 'vue';
    import { useGlobalStore } from '../../stores/GlobalStore';
    import axios from 'axios';

    const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
    });
 
    const globalStore = useGlobalStore();  

    async function like() {
        const movie = globalStore.recommanded.find(m => m.id === props.movie.id);
        if (movie) {
            movie.like = !movie.like;
            movie.likeCount += movie.like ? 1 : -1;

            try {
                await axios.get(`${globalStore.apiHost}/api/vote/${movie.id}`);
            } catch (error) {
                console.error('Error voting for movie:', error);
            }
        }
    }
</script>

<template> 
    <div class="w-full md:mb-4 -mb-5">
        <router-link :to="{name : 'description', params : { slug : movie.titre, id : movie.id}}" class="block w-full h-auto md:min-w-[701px] min-h-48 md:min-h-[384px] md:h-[384px] md:w-[701px] bg-blue-200 cursor-pointer overflow-hidden " >
            <img :src="movie.miniature" class="w-full hover:scale-110 transition-transform duration-300" :alt="movie.titre">
        </router-link>
        <div class=" px-1 sm:px-2 py-1 -translate-y-5 bg-cardmovie-gradient h-14 flex justify-between items-center">
            <div class="titleBlock">
                <div class="flex items-center">
                    <button class="bg-[#fdae5c] rounded px-3 mr-1 font-semibold py-[1px] text-sm">{{ movie.vote.toFixed(2) }}</button>
                    <router-link :to="{name : 'description', params : { slug : movie.titre, id : movie.id}}"  class="block text-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-52 cursor-pointer hover:opacity-65" :title="movie.titre">{{ movie.titre }}</router-link>
                </div>
                <p class="text-xs opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">Le {{ movie.date }}, {{ movie.type }}, Vote total : {{ movie.totLike }}</p>
            </div>
            <div @click="like" class="px-2 py-1 w-16 h-6 bg-custom-gradient rounded-full flex justify-center items-center text-white cursor-pointer hover:scale-105 transition-transform duration-300"> 
                <i class="fas fa-trophy text-sm " :class="movie.like ? 'text-[#ffee00]' : '' " ></i> 
                <strong class="ml-1">{{ movie.likeCount }}</strong>
            </div>
        </div>
    </div>
</template>

<style>
     .titleBlock{
        width: calc(100% - 80px);
    }
</style>