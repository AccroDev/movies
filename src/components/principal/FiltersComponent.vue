<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useMoviesStore } from '@/stores/MoviesStore';

const globalStore = useGlobalStore();
const showTown = ref(false);
const classTownsElements = ref("hidden");
const classShopsElements = ref("hidden");
const classTypeElements = ref("hidden");
const movieStore = useMoviesStore();

const isfetchingShop = ref(false);

onMounted(async () => {
  await globalStore.fetchVilles();
});

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

async function selectVille(ville) {
  globalStore.selectedVille = ville;
  globalStore.selectedShop = '';
  isfetchingShop.value = true;
  await globalStore.fetchShopsByVille(ville);
  isfetchingShop.value = false;
} 

function selectType(type) {
  globalStore.selectedType = type;
}

function toggleDisponible() {
  globalStore.onlyAvailable = !globalStore.onlyAvailable;
}
</script>

<template>
  <section class="bg-white w-full sm:max-w-[95%] md:max-w-[701px] min-h-30 ml-auto mr-auto p-2 flex flex-col my-2 filterSection">
    <div class="flex justify-between my-2 mx-1 w-full h-max">
      <div>
        <h3 class="w-max font-bold text-xl border-b-4 border-[#fdae5c]">Filtres</h3>
      </div>
      <div class="flex justify-center items-center cursor-pointer" @click="toggleDisponible">
        <h6 class="text-xs opacity-60 D-U-text">Disponible Uniquement</h6>
        <h6 class="text-xs opacity-60 hidden D-U-sigle">D.U</h6>
        <div class="relative ml-2 flex justify-center items-center h-max w-max">
          <span class="inline-block rounded-full h-5 w-10 bg-black"></span>
          <span :class="globalStore.onlyAvailable ? 'active bg-green-200' : 'disabled bg-slate-200'" class="inline-flex absolute top-[2px] left-[2px] h-4 w-4 rounded-full justify-center items-center font-bold text-base transition-all duration-300" v-html="globalStore.onlyAvailable ? '<i class=\'fas fa-check text-xs\'></i>' : '<i class=\'fas fa-plus rotate-45 text-xs\'></i>'"></span>
        </div>
      </div>
    </div>

    <div class="flex justify-start my-2 flex-wrap filtersContainer">
      <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('town')">
        <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
          <h5 class="font-semibold text-lg uppercase filterTitle">{{ globalStore.selectedVille || 'Tout' }}</h5>
          <span class="fas fa-arrow-down font-semibold"></span>
        </div>
        <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTownsElements">
          <li v-for="ville in globalStore.villes" :key="ville.id" @click="selectVille(ville.name)" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">{{ ville.name }}</li>
        </ul>
      </div>
      <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('shops')">
        <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:border-b-transparent after:border after:border-black after:spinner" :class="isfetchingShop ? 'isfetchingShop' : 'after:hidden'">
          <i class="fas fa-house"></i> 
        </div>
        <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer" style="width: 60%;" >
          <h5 class="font-semibold text-lg uppercase filterTitle w-full overflow-hidden text-ellipsis whitespace-nowrap ">{{ movieStore.selectedShop.name || 'Tout' }}</h5>
          <span class="fas fa-arrow-down font-semibold"></span>
        </div>
        <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classShopsElements">
          <li @click="movieStore.setSelectedShop('') " class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Tout</li>
          <li v-for="shop in globalStore.shopsByVille[globalStore.selectedVille]" :key="shop.id" @click="movieStore.setSelectedShop(shop) " class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">{{ shop.name }}</li>
        </ul>
      </div>
      <div class="border border-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-start items-center p-1 ml-2 mt-2 relative filterItem" @click="ToggleTown('type')">
        <div class="border border-[#feebd6] rounded-full h-8 w-8 flex justify-center items-center">
          <i class="fas fa-video"></i>
        </div>
        <div class="flex flex-1 justify-between items-center mx-1 cursor-pointer">
          <h5 class="font-semibold text-lg uppercase filterTitle">{{ globalStore.selectedType || 'Tout' }}</h5>
          <span class="fas fa-arrow-down font-semibold"></span>
        </div>
        <ul class="absolute top-10 left-0 right-0 origin-top scale-y-0 px-2 py-1 bg-[#feebd6] rounded-md duration-200 transition-all z-10" :class="classTypeElements">
          <li @click="selectType('')" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Tout</li>
          <li @click="selectType('serie')" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Series</li>
          <li @click="selectType('film')" class="rounded-sm hover:font-semibold py-1 text-xs px-1 cursor-pointer hover:bg-[#e9d5c1]">Films</li>
        </ul>
      </div>
      <div @click="globalStore.setFilter" class="border border-[#feebd6] bg-[#feebd6] rounded-md h-12 w-[45%] sm:w-44 flex justify-center items-center p-1 ml-2 mt-2 cursor-pointer filterItem">
        <h5 class="text-base filterTitle flex items-center justify-center"><span v-if="globalStore.updatingFiltre" class="spinner w-5 h-5 rounded-full border-b-transparent border-2 border-black inline-flex items-center justify-center mr-1" ></span>  Appliquer</h5> 
      </div>
    </div>
  </section>
</template>

<style scoped>
.filterSection {
  box-shadow: 0px 0px 15px 3px #d2d5d5;
}
.active {
  left: calc(100% - 18px);
}
@media screen and (max-width: 390px) {
  .filtersContainer {
    justify-content: center;
  }
  .filterTitle {
    font-size: 12px;
    line-height: 12px;
  }
}
@media screen and (max-width: 260px) {
  .D-U-text {
    display: none;
  }
  .D-U-sigle {
    display: block;
  }
}
.isfetchingShop::after {
  display: block;
  animation: rotate 500ms linear infinite;
}
</style>