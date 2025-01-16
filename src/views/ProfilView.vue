<script setup>
    import HeaderComponent from '@/components/principal/HeaderComponent.vue';
    import MyShops from '@/components/ProfilComponents/MyShops.vue';
    import HistoryComponent from '@/components/ProfilComponents/HistoryComponent.vue';
    import { useAuthStore } from '@/stores/AuthStore';
    import { useRouter } from 'vue-router'; 

    const AuthStore = useAuthStore(); 
    const Routeur = useRouter(); 

    function logout() {
        AuthStore.logout();
        Routeur.push({ name : "home"});
    }
</script>

<template>
    <HeaderComponent />
    <section class="hero-profil max-w-3xl mx-auto" >
        <div class="bg-custom-gradient h-28  flex justify-center items-center relative   before:absolute before:top-0 before:right-0 before:bg-black/25 before:w-full before:h-full" > 
            <h3 class="text-white font-semibold text-3xl whitespace-nowrap w-full text-center overflow-hidden text-ellipsis relative" > {{ AuthStore.userData.name }} </h3>
        </div>
        <div class="flex justify-start items-end ml-5 -translate-y-8 AboutHero" >
            <div class="w-32 h-32 rounded-lg overflow-hidden" >
                <img :src="AuthStore.userData.avatar" class="w-full" alt="">
            </div>
            <div class="ml-2" > 
                <h4 class="text-sm sm:text-base my-1" ><span class="sm:hidden inline-block text-inherit" >Insc : </span><span class="hidden sm:inline-block text-inherit" >Inscription : </span> <strong class="bg-[#3b2b9f] text-white px-1 rounded text-sm sm:text-base" > {{ AuthStore.userData.date }} </strong> </h4>
                <h4 class="text-sm sm:text-base my-1" >Compte :  <strong class="bg-[#3b2b9f] text-white px-1 rounded text-sm sm:text-base"  >Standar</strong> </h4>
                <button @click.prevent="logout" class=" my-1 text-red-900 underline rounded text-sm sm:text-base" >Déconnexion</button>
            </div>
        </div>
    </section>  
    <MyShops />
    <HistoryComponent />
    <router-view ></router-view>
</template>

<style>
    @media screen and (max-width: 250px) {
        .AboutHero {
            flex-direction: column;
            margin: 0;
            align-items: center;
        }
    }
</style>