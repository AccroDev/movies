<script setup>  
    import { ref, defineProps } from 'vue';
    import { useGlobalStore } from '../../stores/GlobalStore';
    import axios from 'axios'; 

    const props = defineProps({
        movie: {
            type: Object,
            required: true
        }
    });
    const globalStore = useGlobalStore();

    const isAdding = ref(false);
    const btnString =ref('Ajouter sur Ad Movies');

    async function addToAccro() {
        if (isAdding === "indexer") {
            tntAdd(props.movie.id);
            return;
        }

        isAdding.value = true; 
        btnString.value = "Enregistrement en cours...";

        try {
            const response = await axios.get(`${globalStore.apiHost}/api/add-movie`, {
            params: {
                category: props.movie.type, 
                id : props.movie.id 
            }
        });     
            if (response.data.statut) {  
                tntAdd(props.movie.id);
            }else {
                isAdding.value = false;
                btnString.value = "Ajouter sur Ad Movies";
                console.error('Error adding movie:', response.data);
            }
        } catch (error) { 
            btnString.value = "Ajouter sur Ad Movies";
            isAdding.value = false
            console.error('Error fetching search results:', error);
        } 
    }
/* isAdding === 'ad' ? 'Enregistrement en cours...' : isAdding === 'tnt' ? 'Indexation en cours...' : 'AJOUTER SUR AD MOVIES' */
    async function tntAdd(id) {
        isAdding.value = true;
        btnString.value = 'Indexation en cours...';
        try { 
            const response = await axios.get(`${globalStore.apiHost}/api/tntAdd`, {
                params: {
                    tntID : id 
                }
            });

            isAdding.value = false;
            if (response.data.statut) { 
                isAdding.value = 'ok';
            }else {
                isAdding.value = "indexer"; 
                btnString.value = 'Indexer sur AD Movies';
                console.error('Error adding movie:', response.data);
            } 
        } catch (error) {
            isAdding.value = "indexer";
            btnString.value = "Indexer sur AD Movies"; 
            console.error('Error fetching search results:', error);
        }
    }
 
</script>

<template>
    <div class="w-full mb-2 sm:w-2/5 md:w-max  sm:px-1">
        <div class="w-full h-auto bg-blue-200 cursor-pointer overflow-hidden" >
            <img :src="movie.miniature" class="w-full hover:scale-110 transition-transform duration-300" :alt="movie.titre">
        </div>
        <div class="px-1 sm:px-2 py-1 bg-white flex flex-col">
            <div class="sm:w-[calc(100% - 80px)] " >
                <div class="flex items-center w-full">
                    <button class="bg-[#fdae5c] rounded px-3 mr-1 font-semibold py-[1px] text-sm" >{{ movie.vote.toFixed(2) }}</button>
                    <h3 class="text-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-52 w-full cursor-pointer hover:opacity-65" :title="movie.titre" >{{ movie.titre }}</h3>
                </div>
                <p class="text-xs opacity-70 md:max-w-[330px]"><small>Le {{ movie.date }},</small> <small>{{ movie.type === 'tv' ? 'serie' : 'film' }} ,</small> {{ movie.description }}</p>
            </div>
            <div v-if="isAdding !== 'ok'" @click="addToAccro" class="px-2 py-1 my-2 max-w-72 h-8 flex justify-center items-center mx-auto bg-custom-gradient rounded relative overflow-hidden text-white cursor-pointer hover:opacity-80 transition-transform duration-300 text-base" :class="isAdding === true ? 'addMovieBtn' : ''" > {{ btnString }} </div>

        </div>
    </div>
</template>

<style scoped > 
    .addMovieBtn::after {
        content: '';
        width: 30%;
        height: 3px;
        position: absolute;
        bottom: 0px;
        background: rgb(0, 0, 0);
        margin-top: 9px; 
        transition: 500ms; 
        animation: moveX 1s linear infinite;
    }
    @keyframes moveX {
        0% {  right: -30%; } 50% {  right: 100%; } 100% { right: -30%;  }
    }
</style>