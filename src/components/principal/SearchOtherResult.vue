<script setup>
    import MoviesCard from '../Cards/MoviesCard.vue';
</script>

<template>
    <section class="my-3 px-2">
        <div class="mb-10">
            <h3 class="font-semibold text-2xl border-b-2 border-[#fdae5c] max-w-max pb-1" >Autres Resultats</h3> 
        </div>
        <div class="flex justify-center" >
            <div class="flex flex-wrap justify-start"> 
                <MoviesCard />
                <MoviesCard /> 
                <MoviesCard /> 
            </div>
        </div> 
    </section>
</template>

<style>
    
</style>