<script setup>
    import MoviesCard from '../Cards/MoviesCard.vue';
</script>

<template>
    <section class="my-3 px-2">
        <div class="mb-10">
            <h3 class="font-semibold text-2xl border-b-2 border-[#fdae5c] w-max pb-1" >Resultats</h3> 
        </div>
        <div class="mx-auto" >
            <div class="mx-1 flex flex-wrap justify-center"> 
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard /> 
            </div>
        </div> 
    </section>
</template>

<style>
    
</style>