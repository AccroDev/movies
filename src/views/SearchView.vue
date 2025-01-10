<script setup>   
    import HeaderComponent from "@/components/principal/HeaderComponent.vue" 
    import SearchBar from "@/components/principal/SearchBar.vue";
    import SearchResult from "@/components/principal/SearchResult.vue";
    import SearchOtherResult from "@/components/principal/SearchOtherResult.vue";
    import SearchTMDB from "@/components/principal/SearchTMDB.vue";
</script>

<template>
    <HeaderComponent /> 
    <section class="max-w-[716px] mx-auto mb-72" >
        <!-- Bar de Recherche -->
        <SearchBar /> 
        <SearchResult /> 
        <SearchOtherResult />  
        <SearchTMDB />  
    </section>
    <router-view></router-view>
</template>
