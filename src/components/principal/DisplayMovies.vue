<script setup>
    import MoviesCard from '../Cards/MoviesCard.vue';
</script>

<template>
    <section class="my-3">
        <div class="intro flex justify-center items-center flex-col mb-10">
            <h3 class="font-semibold text-4xl text-center" >Rétrouver tout nos <span class="text-violet-950">Movies</span> ici</h3>
            <p class="text-center text-xs opacity-65 w-1/2">Vous recherchez un Film ou une serie à regarder ? Faites vous plaisir...</p>
        </div>
        <div class="flex justify-center" ><!-- w-full -mb-3 sm:w-2/5 md:w-max sm:px-1 -->
            <div class="mx-1 flex flex-wrap justify-center sm:justify-start sm:max-w-[95%] md:max-w-[701px] "> 
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard /> 
                <MoviesCard /> 
            </div>
        </div>
        <div class="my-8">
            <span class="spinner w-10 h-10 border-t-2 border-b-2 border-l-2 border-black border-r-2 border-r-transparent rounded-full flex justify-center items-center mx-auto mb-2" ></span>
            <strong class="text-center w-full inline-block">Chargement...</strong>
        </div>
    </section>

</template>

<style>
    .spinner {
        animation: rotate 500ms linear infinite;
    }
    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }
</style>