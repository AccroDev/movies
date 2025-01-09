<script setup>
    
</script>

<template> 
    <form @submit.prevent action="/search" method="post" class="w-full my-10">
        <h2 class="text-center my-2 mb-4 text-2xl" >Rechercher une serie/film</h2>
        <div class="w-full relative py-0 px-2" > 
            <input type="text" name="query" id="query" class="w-full py-2 pr-10 pl-2 text-base opacity-80 outline-none rounded transition-all duration-300 queryInput"> 
            <button type="submit" class="absolute top-0 right-1 h-full w-9 flex items-center justify-center rounded text-white bg-[#fdae5c]" > <i class="fas fa-search " ></i> </button>
        </div>
    </form> 
</template>

<style>
    .queryInput{
        box-shadow: 0px 0px 3px 2px #c5b1d97d;
    }
    .queryInput:focus {
        box-shadow: 0px 0px 3px 2px #c5b1d9
    }
</style>