<script setup>
    
</script>

<template>
    <div class="w-full -mb-3 sm:w-2/5 md:w-max sm:px-1">
        <div class="w-full h-auto bg-blue-200 cursor-pointer overflow-hidden" >
            <img src="/src/assets/img/1R68vl3d5s86JsS2NPjl8UoMqIS.jpg" class="w-full hover:scale-110 transition-transform duration-300" alt="">
        </div>
        <div class="px-1 sm:px-2 py-1 -translate-y-5 bg-cardmovie-gradient h-14 flex justify-between items-center">
            <div class="titleBlock" >
                <div class="flex items-center w-full">
                    <button class="bg-[#fdae5c] rounded px-3 mr-1 font-semibold py-[1px] text-sm" >6.5</button>
                    <h3 class="text-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-52 w-full cursor-pointer hover:opacity-65" title="La casa de Papel" >La casa de Papel</h3>
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