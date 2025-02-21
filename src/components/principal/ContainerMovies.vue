<script setup >
import { onMounted, ref } from 'vue';
import MovieDownload from '../Cards/MovieDownload.vue';
import { useMoviesStore } from '@/stores/MoviesStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useGlobalStore } from '@/stores/GlobalStore';

const MoviesStore = useMoviesStore()
const Route = useRoute();
const GlobalStore = useGlobalStore();

const paramsID = Route.params.id;

    onMounted(() => { 
        if (!MoviesStore.MoviesInFolder[paramsID]) {
            fetchMoviesInFolder(paramsID);
        }else {
            fetching.value = false; 
        }
    });

    const msg = ref('');
    const fetching = ref(true);

    async function fetchMoviesInFolder(id)
    {
        try { 
            const request = await axios.get(`${GlobalStore.apiHost}/api/get-download-movie`,{
                params : { id : id }
            });
            let response = request.data;
            
            if(response['status'] === true) {
                MoviesStore.setMoviesInFolder(id,response['data']) 
                fetching.value = false; 
            } else {
                msg.value = response['message'];
                fetching.value = 'error'; 
            } 
        } catch (error) {
            console.error('error', error);
            fetching.value = 'error'; 
            msg.value = "Request Error ): ";
        }

    }
</script>


<template> 
    <div v-if="fetching === true || fetching === 'error'  " >
        <div v-if="fetching === true" class=" w-3 h-3"  > spinner </div>
        <div v-else-if="fetching === 'error'" > {{ msg }} </div>
    </div>
    <div v-else-if="MoviesStore.MoviesInFolder[paramsID] " class="w-full flex flex-wrap h-max" >
        <MovieDownload v-for="items in MoviesStore.MoviesInFolder[paramsID]" :key="items" :items="items" :paramsID="paramsID" />  
    </div>
</template>

<style>
    
</style>