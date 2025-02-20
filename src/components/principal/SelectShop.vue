<script setup>  
    import { ref, onMounted } from 'vue'; 
    import { useGlobalStore } from '@/stores/GlobalStore'; 
    import { useSearchStore } from '@/stores/SearchStore';

    const globalStore = useGlobalStore();
    const SearchStore = useSearchStore(); 

    const showTown = ref(false);
    const classTownsElements = ref("hidden");
    const classShopsElements = ref("hidden");
    const classTypeElements = ref("hidden");
    function ToggleTown(classToUpdate) {
        showTown.value = !showTown.value;
        classToUpdate = classToUpdate === "town" ? classTownsElements : classToUpdate === "shops" ? classShopsElements : classTypeElements;
        if (showTown.value) {
            classToUpdate.value = "scale-y-0";
            setTimeout(() => {
            classToUpdate.value = "scale-y-100";
            }, 3);
        } else {
            classToUpdate.value = "scale-y-0";
            setTimeout(() => {
            classToUpdate.value = "hidden";
            }, 300);
        }
    }

    const isfetchingShop = ref(false);
    async function selectVille(ville) {
        SearchStore.selectedVille = ville;
        SearchStore.selectedShop = '';
        isfetchingShop.value = true;
        await globalStore.fetchShopsByVille(ville);
        isfetchingShop.value = false;
    } 

    onMounted(async () => {
        await globalStore.fetchVilles();
    });
</script>

<template> 

    <section class="bg-white w-full sm:max-w-[95%] md:max-w-[701px] min-h-30 ml-auto mr-auto p-2 flex flex-col my-2 filterSection">


        <div class="flex justify-between my-2 mx-1 w-full h-max">
            <div>
                <h3 class="w-max font-bold text-xl border-b-4 border-[#fdae5c]">Filtres</h3>
            </div> 
        </div>

        <div class="flex justify-start my-2 flex-wrap filtersContainer"> 

            <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('town')">

                <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
                    <i class="fas fa-map-marker-alt"></i>
                </div>

                <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
                    <h5 class="font-semibold text-lg uppercase filterTitle">{{ SearchStore.selectedVille || 'Tout' }}</h5>
                    <span class="fas fa-arrow-down font-semibold"></span>
                </div>
                
                <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements">

                    <li @click="selectVille('')" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Tout</li>

                    <li v-for="ville in globalStore.villes" :key="ville.id" @click="selectVille(ville.name)" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">{{ ville.name }}</li>

                </ul>

            </div>


            <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('shops')">

                <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-b-transparent after:border after:border-black after:spinner" :class="isfetchingShop ? 'isfetchingShop' : 'after:hidden'">
                    <i class="fas fa-house"></i> 
                </div>

                <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer" style="width: 60%;" >
                    <h5 class="font-semibold text-lg uppercase filterTitle w-full overflow-hidden text-ellipsis whitespace-nowrap ">{{ SearchStore.selectedShop.name || 'Tout' }}</h5>
                    <span class="fas fa-arrow-down font-semibold"></span>
                </div>

                <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classShopsElements">
                    <li @click="SearchStore.setSelectedShop('') " class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Tout</li>

                <li v-for="shop in globalStore.shopsByVille[SearchStore.selectedVille]" :key="shop.id" @click="SearchStore.setSelectedShop(shop)" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">{{ shop.name }}</li>
                </ul>
            </div>   
        </div>
    </section> 

 
</template>

<style>
    
</style>