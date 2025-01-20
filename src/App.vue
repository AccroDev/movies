<script setup>
import {  RouterView,useRouter } from 'vue-router' 
import addMovieShop from './components/Modals/addMovieShop.vue';  
import { useMoviesStore } from './stores/MoviesStore';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/AuthStore'; 
import ScriptLoader from './components/principal/ScriptLoader.vue';
import { useGlobalStore } from './stores/GlobalStore';



  const MoviesStore = useMoviesStore(); 
  const AuthStore = useAuthStore(); 
  onMounted(()=> {
    const userData = sessionStorage.getItem("userData")
    if (userData && JSON.parse(userData)) {
      AuthStore.setUserDate(JSON.parse(userData));
    }
  }) 

  const globalStore = useGlobalStore();
  const router = useRouter();
    // Surveille les changements de route
  router.beforeEach(() => { 
    globalStore.setScriptLoading(true)// Active le chargement
  });

  router.afterEach(() => { 
    globalStore.setScriptLoading(false)// Désactive le chargement 
  });
</script>

<template>  
  <RouterView />  
  <transition name="slide" >
    <addMovieShop :key="'one'" v-if="MoviesStore.DisplayAddInShop" @closeAddModal="MoviesStore.setDisplayAddInShop(!MoviesStore.DisplayAddInShop)" />
  </transition>
  <transition name="slide" >
    <ScriptLoader :key="'one'" v-if="globalStore.scriptLoading" />
  </transition>
  
</template>

<style>   
  .slide-enter-active, .slide-leave-active {
    transition: 0.3s ease;
  }
  .slide-enter-active .addShopWrapper, .slide-leave-active .addShopWrapper{
    transition: 0.3s ease;
  }
  .slide-enter-from { 
    opacity: 0; 
  }

  .slide-enter-to { 
      opacity: 1; 
  }
  .slide-enter-from .addShopWrapper, .slide-enter-from .wrapper{ 
    transform: translateY(30px);
  }

  .slide-enter-to .addShopWrapper, .slide-enter-from .wrapper{ 
      transform: translateY(0px);
  }
  .slide-leave-from .addShopWrapper, .slide-enter-from .wrapper{ 
    transform: translateY(0px);
  }

  .slide-leave-to .addShopWrapper, .slide-enter-from .wrapper{ 
      transform: translateY(30px);
  }
  .slide-leave-from { 
    opacity: 1;
  }

  .slide-leave-to { 
      opacity: 0;
    } 


  /* for shopCard.vue and updateMovieInShop.vue */

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

  .spinner {
    animation: rotate 500ms linear infinite;
  }
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>
