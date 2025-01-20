<script setup>   
    import HeaderComponent from "@/components/principal/HeaderComponent.vue"
    import FiltersComponent from "@/components/principal/FiltersComponent.vue";
    import DisplayMovies from "@/components/principal/DisplayMovies.vue";
    import RecommandationCarousel from "@/components/principal/RecommandationCarousel.vue";
</script>

<template>
    <HeaderComponent />
    <keep-alive  > 
      <RecommandationCarousel />
    </keep-alive>
    <FiltersComponent />
    <DisplayMovies /> 
    <router-view v-slot="{ Component }">
      <transition  name="slide" mode="out-in" >
        <component :is="Component"  />
      </transition>
    </router-view>
</template>

<style>
    .slide-enter-active, .slide-right-leave-active {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-enter-active .wrapper, .slide-right-leave-active .wrapper{
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-enter-from { 
      opacity: 0;
    }

    .slide-enter-to { 
      opacity: 1;
    }

    .slide-leave-from { 
      opacity: 1;
    } 
    .modal-leave-active{
      transition: opacity 300ms;
      opacity: 0;
    }


    .slide-enter-from .wrapper{ 
        transform: translateY(10%); 
    }

    .slide-enter-to .wrapper{ 
        transform: translateY(0%); 
    } 

    .modal-leave-active .wrapper{ 
        transition: transform 300ms;
        transform: translateY(10%); 
    }
</style>
