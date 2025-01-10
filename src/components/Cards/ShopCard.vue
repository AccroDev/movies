<script setup> 

    const props = defineProps(["src"]);
</script>

<template>
    <div class="shopCard w-56 h-24 m-2 p-1 rounded flex" >
        <div class="w-20 min-w-20 h-full flex items-center justify-center shopMinia" >
            <img :src="props.src" class="w-full h-full object-contain" alt="">
        </div>
        <div class="flex flex-col ml-1" >
            <h4 class="mb-auto font-semibold text-sm  " >Wolf Services</h4>
            <p class="text-xs" >Tél : <span>+25766478279</span> </p>
            <p class="text-xs" > <strong>Bukavu : </strong> Lorem ipsum dolor sit amet,   </p>
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