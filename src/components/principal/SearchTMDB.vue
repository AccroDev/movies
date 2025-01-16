<script setup>

    import { watch } from 'vue';
    import TMDBsearch from '../Cards/TMDBsearch.vue';
    import axios from 'axios'; 
    import { useGlobalStore } from '../../stores/GlobalStore';
    import { useSearchStore } from '../../stores/SearchStore';

    const globalStore = useGlobalStore();
    const searchStore = useSearchStore();

    watch(() => searchStore.search, async (newValue) => {
        if (newValue && newValue === 2) {
            try {
            const response = await axios.get(`${globalStore.apiHost}/api/search`, {
                params: {
                    query: searchStore.query,
                    type: 't',
                    found : JSON.stringify(searchStore.foundTmbMovies) 
                }
            });  
                searchStore.setResults(response.data,'t');
                searchStore.setSearch(false); // set search flag to 1 for another search
            } catch (error) {
                searchStore.setSearch(false); // set search flag to 1 for another search
                console.error('Error fetching search results:', error);
            }
        }
    });
</script>

<template>
    <section class="my-3 px-1" v-if="searchStore.thdbResults.length > 0">
        <div class="mb-10">
            <h3 class="font-semibold text-2xl border-b-2 border-[#fdae5c] max-w-max pb-1" >Autres Site Web</h3> 
        </div>
        <div class="flex justify-center w-full" >
            <div class="flex flex-wrap justify-start w-full"> 
                <TMDBsearch  v-for="result in searchStore.thdbResults" :key="result.id" :movie="result"  />
            </div>
        </div> 
    </section>
</template>

<style>
    
</style>