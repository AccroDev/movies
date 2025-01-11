<script setup>
    
</script>

<template>
    <div class="flex flex-col p-2 w-1/2 md:w-1/3 downloadMovieItem" >
        <div class="flex items-center" >
            <div class="w-[20%] sm:w-[30%] min-w-[20%]  sm:min-w-[30%] " >
                <img src="/src/assets/img/téléchargement.jfif" alt="">
            </div>
            <div class="h-full flex flex-col justify-between w-full" >
                <h3 class="text-sm" >La casa de papel SO1 Ep1</h3>
                <div class="flex justify-between items-center mt-2" >
                    <strong class="mx-1 px-1 text-sm text-black flex items-center justify-center rounded-sm bg-[#fedebc] cursor-pointer font-normal" >300Mb</strong>
                    <button class="mx-1 px-1 text-sm text-white flex items-center justify-center rounded-sm bg-blue-500" >Download</button>
                </div>
            </div>
        </div>
        <div class="w-full h-3 rounded-sm bg-gray-400 my-1 flex items-center justify-center after:absolute relative after:w-[42%] after:h-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-blue-500" >
            <small class="text-[8px] text-white relative block w-max z-20" >42%</small>
        </div>
    </div>
</template>

<style>
    @media screen and (max-width: 400px) {
        .downloadMovieItem {
            width: 100%;
            min-width: 100%;
        }
    }
</style>