<script setup>
    import { ref } from 'vue';

    
    const UniDisponible = ref(false);
    function toggleDisponible() { 
        UniDisponible.value = !UniDisponible.value;
    }

    const showTown = ref(false);
    const classTownsElements = ref("hidden");
    const classShopsElements = ref("hidden");
    const classTypeElements = ref("hidden");
    function ToggleTown(classToUpdate) {
        showTown.value = !showTown.value;
        classToUpdate = classToUpdate === "town" ? classTownsElements : classToUpdate === "shops" ? classShopsElements : classTypeElements;
        if (showTown.value) {
            classToUpdate.value = "scale-y-0"
            setTimeout(() => { 
                classToUpdate.value = "scale-y-100" 
            }, 3);
        } else {
            classToUpdate.value = "scale-y-0"
            setTimeout(() => {
                classToUpdate.value = "hidden"
            }, 300);
        }
    }
   
</script>

<template>
    <section class="bg-white w-full sm:max-w-[95%] md:max-w-[701px] min-h-30 ml-auto mr-auto p-2 flex flex-col my-2 filterSection">
        <div class="flex justify-between my-2 mx-1 w-full h-max " >
            <div>
                <h3 class="w-max font-bold text-xl border-b-4 border-[#fdae5c]" >Filtres</h3>
            </div>
            <div class="flex justify-center items-center cursor-pointer" @click="toggleDisponible">
                <h6 class="text-xs opacity-60  D-U-text" >Disponible Uniquement</h6>
                <h6 class="text-xs opacity-60 hidden D-U-sigle" >D.U</h6>
                <div class="relative ml-2 flex justify-center items-center h-max w-max" >
                    <span class="inline-block rounded-full h-5 w-10 bg-black" ></span>
                    <span :class="UniDisponible ? 'active bg-green-200' : 'disabled bg-slate-200'  " class="inline-flex absolute top-[2px] left-[2px] h-4 w-4 rounded-full   justify-center items-center font-bold text-base transition-all duration-300" v-html="UniDisponible ? '<i class=\'fas fa-check text-xs\'></i>' : '<i class=\'fas fa-plus rotate-45 text-xs\'></i>' " > </span>
                </div>
            </div>
        </div>

        <div class="flex justify-start my-2 flex-wrap  filtersContainer">
            <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('town')" >
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
            <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('shops')">
                <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
                    <i class="fas fa-house" ></i>
                </div>
                <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
                    <h5 class="font-semibold text-lg uppercase filterTitle">AccroDev</h5>
                    <span  class="fas fa-arrow-down font-semibold"></span>
                </div> 
                <ul class="absolute top-10 left-0  right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classShopsElements" >
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >AccroDev</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Wolf Services</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >lorem ipsum</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >lorem ipsum</li>
                </ul>
            </div> 
            <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('type')" >
                <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
                    <i class="fas fa-video" ></i>
                </div>
                <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
                    <h5 class="font-semibold text-lg uppercase filterTitle">Series</h5>
                    <span  class="fas fa-arrow-down font-semibold"></span>
                </div> 
                <ul class="absolute top-10 left-0  right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTypeElements" >
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Series</li>
                    <li class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]" >Films</li> 
                </ul>
            </div> 
            <div class="border border-[#feebd6] bg-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-center items-center p-1 ml-2 mt-2 cursor-pointer filterItem" >
                <h5 class="text-base filterTitle ">Appliquer</h5>  
            </div> 
           
        </div>
    </section>
</template>

<style scoped>
     .filterSection{
        box-shadow: 0px 0px 15px 3px #d2d5d5;
    }
    .active{
        left: calc(100% - 18px);
    }
    @media screen and (max-width: 390px) {
       .filtersContainer{
            justify-content: center;
       }  
       .filterTitle{
        font-size: 12px;
        line-height: 12px;
       }
    }
    @media screen and (max-width: 260px) {
       .D-U-text{
            display: none;
       } 
       .D-U-sigle{
            display: block;
       }  
    } 
</style>