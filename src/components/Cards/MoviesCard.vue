<script setup>
    import { useMoviesStore } from '@/stores/MoviesStore';
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
    
    const MoviesStore = useMoviesStore();
    const ShopsIsSelected = ref(true);

    const PathIsShow = ref(false); 
</script>

<template>
    <div class="w-full -mb-3 sm:w-1/2  md:w-max sm:px-1 overflow-hidden rounded-t-md relative">
        <div class="movie-control absolute top-2 left-0 right-0 w-full flex justify-between items-center k h-6 z-10  " >

            <div v-if="ShopsIsSelected" class="pl-2 flex items-center justify-start" >

                <!-- add this movie on shop selected -->
                <button v-if="true" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-[10px]" >Ajouter</button>

                <!-- remove this movie on shop selected -->
                <button v-else class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-[10px]" >Supp.</button>

            </div>

            <div class="pr-2 flex justify-end items-center w-full" >
                <!-- show path where found this movies on shop selected -->
                <button v-if="ShopsIsSelected" @click="PathIsShow = !PathIsShow" :class="PathIsShow ? 'w-2/4 justify-between' : 'w-4 justify-center'" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-[10px] h-4 flex items-center transition-all duration-300 overflow-hidden whitespace-nowrap text-ellipsis"> {{ PathIsShow ? 'Mon DiskDur' : '' }} <i class="fas" :class="PathIsShow ? 'fa-plus rotate-45' : 'fa-check' " ></i> </button>

                <!-- show my shops and path where found this movies when there is not shops selected -->
                <button v-else @click="MoviesStore.setDisplayAddInShop(true)" class="bg-[#fdae5c] rounded-full px-2 py-[1px] text-[10px] h-5 w-5 flex items-center justify-center"> <i class="fas fa-info" ></i> </button>
            </div>
            
        </div>
        <router-link :to="{name : 'description', params : { slug : 'lorem', id : 12}}" class="block w-full h-auto bg-blue-200 cursor-pointer overflow-hidden" >
            <img src="/src/assets/img/1R68vl3d5s86JsS2NPjl8UoMqIS.jpg" class="w-full hover:scale-110 transition-transform duration-300" alt="">
        </router-link>
        <div class="px-1 sm:px-2 py-1 -translate-y-5 bg-cardmovie-gradient h-14 flex justify-between items-center">
            <div class="titleBlock" >
                <div class="flex items-center w-full">
                    <button class="bg-[#fdae5c] rounded px-3 mr-1 font-semibold py-[1px] text-sm" >6.5</button>
                    <router-link :to="{name : 'description', params : { slug : 'lorem', id : 12}}" class="block text-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-52 w-full cursor-pointer hover:opacity-65" title="La casa de Papel" >La casa de Papel</router-link>
                </div>
                <p class="text-xs opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">Le 12/02/2023, Lorem Ipsum</p>
            </div>
            <div class="px-2 py-1 w-16 h-6 bg-custom-gradient rounded-full flex justify-center items-center text-white cursor-pointer hover:scale-105 transition-transform duration-300">
                <i class="fas fa-heart"></i>
                <strong class="ml-1" >200</strong>  
            </div>
        </div>
    </div>
</template>

<style>
    .titleBlock{
        width: calc(100% - 80px);
    }
</style>