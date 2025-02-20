<script setup>   
    import HeaderComponent from "@/components/principal/HeaderComponent.vue" 
    import SearchBar from "@/components/principal/SearchBar.vue";
    import SearchResult from "@/components/principal/SearchResult.vue";
    import SearchOtherResult from "@/components/principal/SearchOtherResult.vue";
    import SearchTMDB from "@/components/principal/SearchTMDB.vue";
    import SelectShop from "@/components/principal/SelectShop.vue"; 
    import { onMounted } from "vue";

    import { useAuthStore } from "@/stores/AuthStore";
    const authStore = useAuthStore(); 
    
    onMounted(() => { 
        if (authStore.userData.id && authStore.userShops.length < 1) {
            authStore.fetchUserShops();
        }
    });

</script>

<template>
    <HeaderComponent /> 
    <section class="max-w-[716px] mx-auto" >
        <!-- Bar de Recherche -->
        <SearchBar /> 
        <SelectShop  />
        <SearchResult /> 
        <SearchOtherResult />  
        <SearchTMDB />  
    </section>
    <router-view></router-view>
</template>
