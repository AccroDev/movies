<script setup> 

    const props = defineProps(["src"]);
</script>

<template>
    <div class="shopCard w-full sm:w-72 overflow-hidden h-36 sm:h-28 m-2 p-1 rounded flex" >
        <div class="w-2/5 sm:w-28 min-w-[40%] sm:min-w-28 h-full flex items-center justify-center shopMinia" >
            <img :src="props.src" class="w-full h-full object-contain" alt="">
        </div>
        <div class="flex flex-col ml-1 py-2 overflow-hidden" >
            <h4 class="mb-auto font-semibold text-lg sm:text-sm  " >Wolf Services</h4>
            <p class="text-lg sm:text-base" >Tél : <span>+25766478279</span> </p>
            <p class="text-lg mt-2 sm:text-base" > <strong>Bukavu : </strong> Lorem ipsum dolor sit amet,   </p>
        </div>
    </div>
</template>

<style>
    .shopCard{
        box-shadow: 0px 0px 5px 1px #0000004f;
    }
    @media screen and (max-width: 250px) {
        .shopMinia {
            display: none; 
        }
        .shopCard {
            margin: 8px 0px;
            height: auto;
        }
    }
</style>