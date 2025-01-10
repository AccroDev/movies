<script setup>   
    import HeaderComponent from "@/components/principal/HeaderComponent.vue"
    import FiltersComponent from "@/components/principal/FiltersComponent.vue";
    import DisplayMovies from "@/components/principal/DisplayMovies.vue";
    import RecommandationCarousel from "@/components/principal/RecommandationCarousel.vue";
</script>

<template>
    <HeaderComponent />
    <RecommandationCarousel />
    <FiltersComponent />
    <DisplayMovies />
    <router-view></router-view>
</template>
