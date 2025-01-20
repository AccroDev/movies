<script setup>  
    import { defineProps } from 'vue'; 
    import { useGlobalStore } from '@/stores/GlobalStore';
    import { useMoviesStore } from '@/stores/MoviesStore';
    const props = defineProps({
        shops: {
            type: Array,
            required: true
        }
    });  
 
    const movieStore = useMoviesStore(); 
</script>

<template>
    <div class="my-2 p-2"> 
        <h3 class="font-semibold text-xl my-2" >Selectionner</h3>
        <ul class="flex flex-wrap justify-center">
            <li 
                @click="movieStore.setSelectedShop(false,true)" 
                class="bg-white/70 font-semibold px-2 py-1 m-1 cursor-pointer text-sm rounded" 
                :class="movieStore.SelectedSearchShop === false ? 'bg-custom-gradient text-white' : 'bg-white/70 text-black'" 
                >Aucun</li>
            <li 
                :class="movieStore.SelectedSearchShop === shop.id ? 'bg-custom-gradient text-white' : 'bg-white/70 text-black'" class=" font-semibold px-2 py-1 m-1 cursor-pointer text-sm rounded "  v-for="shop in shops" :key="shop.id" @click="movieStore.setSelectedShop(shop,true)" >

                <span>{{ shop.ville}}</span>  : <span>{{shop.name }}</span>

            </li> 
        </ul>
    </div>
</template>

<style>
    
</style>