<script setup>
import router from '@/router';
import MoviesDownload from '@/components/Modals/MoviesDownload.vue';
import MoviesDescription from '@/components/Modals/MoviesDescription.vue';
import MovieShops from '@/components/Modals/MovieShops.vue'; 
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted } from 'vue';

import { useDescriptStore } from '@/stores/DescriptStore';
import { useGlobalStore } from '@/stores/GlobalStore';
const DescriptStore = useDescriptStore();

const globalStore = useGlobalStore();

const route = useRoute(); 
const returnRoute = computed(() => { 
  const parentRoute = route.matched[route.matched.length - 2];
  return parentRoute ? { name: parentRoute.name } : { name: 'home' };
}); 

onUnmounted(() => { document.body.style.overflow = ''; })
onMounted(() => { document.body.style.overflow = 'hidden'; })

</script> 
<template>
    <section @click="router.push(returnRoute)" class="fixed top-0 left-0 bottom-0 right-0 bg-black/80 w-full h-full z-30 flex justify-center items-center descriptModal"  >
        <div @click.stop class="wrapper bg-white rounded-md w-[95%] sm:w-4/5 max-w-2xl h-[90%] overflow-hidden">
            <header class="w-full h-14 bg-black" >
                <ul class="flex items-center h-full px-2">
                    <li 
                        :class="DescriptStore.displayBlock === 'descript' ? 'bg-[#272727e0]' : ''"
                        class=" cursor-pointer hover:text-[#c4eac8] list-none text-white ml-2 text-base rounded-sm px-2 " 
                        @click="DescriptStore.setDisplayBlock('descript')" 
                    >Descr.</li>
                    <li 
                        :class="DescriptStore.displayBlock === 'shops' ? 'bg-[#272727e0]' : ''"
                        class=" cursor-pointer hover:text-[#c4eac8] list-none text-white ml-2 text-base rounded-sm px-2 " 
                        @click="DescriptStore.setDisplayBlock('shops')" 
                    >Shops</li>
                    <li 
                        :class="DescriptStore.displayBlock === 'download' ? 'bg-[#272727e0]' : ''"
                        class=" cursor-pointer hover:text-[#c4eac8] list-none text-white ml-2 text-base rounded-sm px-2 downloadSectionBtn" 
                        @click="DescriptStore.setDisplayBlock('download')"
                    >Download</li> 

                    <router-link :to="returnRoute" class=" cursor-pointer hover:text-[#c4eac8] list-none text-white text-base ml-auto w-8 flex justify-center items-center bg-red-950 hover:bg-red-800 duration-300 transition-all rounded-sm py-[2px] px-5 " ><i class="fas fa-plus rotate-45" ></i></router-link> 

                </ul>
            </header>
            <main  class="relative overflow-x-hidden overflow-y-auto modalContent">
                 
                <transition 
                    :name="DescriptStore.direction === 'right' ? 'slide-right' : 'slide-left'"
                    mode="out-in"
                >
                    <div :key="DescriptStore.displayBlock" class="w-full min-h-full flex flex-col " :class="DescriptStore.displayBlock === 'descript' ? 'bg-[#231c55]' : 'h-full'" >
                      <MoviesDescription 
                          v-if="DescriptStore.displayBlock === 'descript'" 
                      />
                      <MovieShops 
                          v-if="DescriptStore.displayBlock === 'shops'" 
                      />
                      <MoviesDownload 
                          v-if="DescriptStore.displayBlock === 'download'" 
                      />
                    </div>
                </transition> 

            </main>
        </div>
    </section>
</template>

<style scoped> 
    /* Animation vers la droite */
    .slide-right-enter-active, .slide-right-leave-active {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-right-enter-from {
      transform: translateX(100%);
      opacity: 0;
    }

    .slide-right-enter-to {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-right-leave-from {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-right-leave-to {
      transform: translateX(-100%);
      opacity: 0;
    }

    /* Animation vers la gauche */
    .slide-left-enter-active, .slide-left-leave-active {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-left-enter-from {
      transform: translateX(-100%);
      opacity: 0;
    }

    .slide-left-enter-to {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-left-leave-from {
      transform: translateX(0);
      opacity: 1;
    }

    .slide-left-leave-to {
      transform: translateX(100%);
      opacity: 0;
    }

    .modalContent {
      height: calc(100% - 3.5rem);
    }
    @media screen and (max-width: 300px) {
      .downloadSectionBtn{ display: none;}
    }
 
</style>
