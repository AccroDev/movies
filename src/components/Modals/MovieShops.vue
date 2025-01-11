<script setup>
    import { ref } from 'vue';
    import ShopCard from '../Cards/ShopCard.vue';



    const showTown = ref(false);
    const classTownsElements = ref("hidden"); 
    function ToggleTown() {
        showTown.value = !showTown.value;
        if (showTown.value) {
            classTownsElements.value = "scale-y-0"
            setTimeout(() => { 
                classTownsElements.value = "scale-y-100" 
            }, 3);
        } else {
            classTownsElements.value = "scale-y-0"
            setTimeout(() => {
                classTownsElements.value = "hidden"
            }, 300);
        }
    }
</script>

<template>
    <div  class="w-full min-h-48 px-2 py-3 movieShopsDesc" > 
        <h3 class="text-base pb-1 border-b-4 w-max border-black font-medium" >Selectionner une Ville</h3>
        <form v-on:submit.prevent action="/" method="post" class="flex items-end flex-wrap" >
            <div class="border border-[#feebd6] rounded-md h-12 w-[60%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown()" >
                <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
                    <i class="fas fa-map-marker-alt" ></i>
                </div>
                <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
                    <h5 class="font-semibold text-lg uppercase filterTitle">Bujumbura</h5>
                    <span  class="fas fa-arrow-down font-semibold"></span>
                </div> 
                <ul class="absolute top-10 left-0  right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements" >
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Bujumbura</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Goma</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Bukavu</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Minova</li>
                </ul>
            </div> 
            <button class="text-white bg-blue-500 rounded px-2 py-1 hover:opacity-85 transition-opacity duration-300 text-base ml-2 mt-2"><i class="fas fa-search"></i> Rechercher</button>
        </form> 

        <h3 class="text-base pb-1 mt-2 mb-4 border-b-4 w-max border-black font-medium" >Resultats</h3>

        <div class="flex flex-wrap" >
            <ShopCard src="/src/assets/img/user.jpg" />
            <ShopCard src="/src/assets/img/edition.webp" />
            <ShopCard src="/src/assets/img/user.jpg" />
            <ShopCard src="/src/assets/img/edition.webp" />
            <ShopCard src="/src/assets/img/user.jpg" />
        </div> 
    </div>
</template>

<style>
    @media screen and (max-width: 350px) {
        .filterItem {
            width: 100%;
        }
    }
</style>