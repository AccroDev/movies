<script setup>
import { RouterLink, RouterView } from 'vue-router' 
import addMovieShop from './components/Modals/addMovieShop.vue';  
import { useMoviesStore } from './stores/MoviesStore';


const MoviesStore = useMoviesStore(); 
</script>

<template>  
  <RouterView />  
  <transition name="slide" >
    <addMovieShop :key="'one'" v-if="MoviesStore.DisplayAddInShop" @closeAddModal="MoviesStore.setDisplayAddInShop(!MoviesStore.DisplayAddInShop)" />
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
  .slide-enter-from .addShopWrapper{ 
    transform: translateY(30px);
  }

  .slide-enter-to .addShopWrapper{ 
      transform: translateY(0px);
  }
  .slide-leave-from .addShopWrapper{ 
    transform: translateY(0px);
  }

  .slide-leave-to .addShopWrapper{ 
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
</style>
