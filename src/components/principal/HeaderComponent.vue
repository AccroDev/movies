<script setup>
    import { useAuthStore } from '@/stores/AuthStore';
    import { ref } from 'vue';

    const NavClassAnimation = ref("hiddenNavMenu active");
    const isShowMenu = ref(false); 
    function displayNavMenu() {
        isShowMenu.value = !isShowMenu.value 
        if (isShowMenu.value) {
            NavClassAnimation.value = "showNavMenu"
            setTimeout(() => {
                NavClassAnimation.value = "showNavMenu active"
            }, 2);
        } else {
            NavClassAnimation.value = "hiddenNavMenu"
            setTimeout(() => {
                NavClassAnimation.value = "hiddenNavMenu active"
            }, 300);
        }
    }

    const AuthStore = useAuthStore();

    const classAuthLik = ref('hidden h-0');
    function showAuthLik() {
        if (classAuthLik.value === 'hidden h-0') {
            classAuthLik.value = 'block h-0';
            setTimeout(() => {
                classAuthLik.value = 'block h-16';
            }, 3);
        }else {
            classAuthLik.value = 'block h-0';
            setTimeout(() => {
                classAuthLik.value = 'hidden h-0';
            }, 100);
        }
    }
</script>

<template>
    <header class="h-20 w-full bg-custom-gradient px-1 py-1 flex justify-between items-center relative md:px-2 lg:px-5 z-10" >
        <div class="h-full flex justify-start items-center">
            <router-link :to="{name: 'home'}"  class="transition-opacity duration-300 h-full hover:opacity-65 " >
                <img class="h-full" src="/src/assets/img/logo.png" alt="accrodev movies logo">
            </router-link> 
            <div class="ml-2 headerTitle">
                <h2 class="text-white  text-3xl accrodev-title">AccroDev</h2>
                <h4 class="text-white opacity-65 text-base movie-title">Movies</h4>
            </div>
        </div> 
        <nav :class="NavClassAnimation" class="transition-all duration-300 flex-col absolute top-20 left-0 right-0 w-full p-2 justify-between bg-custom-gradient sm:flex-row md:static md:w-max md:p-0 md:bg-none overflow-hidden border-t border-t-slate-100/50 md:border-none" >  
            <a href="/" class="my-1 w-max  transition-colors duration-300 text-white mr-2 hover:text-[#c4eac8] hover:border-b-2 hover:border-[#c4eac8]"><i class="fas fa-align-left" style="width: 14px;font-size: 14px;"></i> Articles </a>
            <a href="/" class="my-1 w-max  transition-colors duration-300 text-white mr-2 hover:text-[#c4eac8] hover:border-b-2 hover:border-[#c4eac8]"><i class="fas fa-align-left" style="width: 14px;font-size: 14px;"></i> Articles </a>
            <a href="/" class="my-1 w-max  transition-colors duration-300 text-white mr-2 hover:text-[#c4eac8] hover:border-b-2 hover:border-[#c4eac8]"><i class="fas fa-file-archive" style="width: 14px;font-size: 14px;"></i> Models </a>
            <a href="/" class="my-1 w-max  transition-colors duration-300 text-white mr-2 hover:text-[#c4eac8] hover:border-b-2 hover:border-[#c4eac8]"><i class="fas fa-shopping-cart" style="width: 14px;font-size: 14px;"></i> Boutiques </a>
            <a href="/" class="my-1 w-max  transition-colors duration-300 text-white mr-2 hover:text-[#c4eac8] hover:border-b-2 hover:border-[#c4eac8] hiddenMenuTablette"><i class="fas fa-book" style="width: 14px;font-size: 14px;"></i> Formations </a>
        </nav>
        <div class="flex justify-center items-center">
            <router-link :to="{name: 'search'}" class=" rounded-full h-6 w-6 overflow-hidden mr-4 pl-2">
                <i class="fas fa-search text-white" ></i>
            </router-link>


            <!-- user, if is  -->
            <router-link v-if="AuthStore.userData.id"  :to="{name: 'profil'}" class="block rounded-full h-6 w-6 overflow-hidden mr-4">
                <img :src="AuthStore.userData.avatar" class="w-full" alt="">
            </router-link>
            <div v-else @click="showAuthLik" class="rounded-full w-6 h-6 mr-4 p-1 border border-white flex items-center justify-center cursor-pointer hover:opacity-85  duration-300 relative">
                <i class="fas fa-user text-white text-xs" ></i>
                <ul :class="classAuthLik" class=" absolute top-7 rounded w-32 p-1 bg-white transition-all duration-100 overflow-hidden" >
                    <router-link :to="{ name : 'login'}" class="block py-1 text-sm pl-1 rounded-sm hover:bg-black/5" >Connexion</router-link>
                    <router-link :to="{ name : 'signin'}" class="block pb-1 text-sm pl-1 rounded-sm hover:bg-black/5" >Inscription</router-link>
                </ul>
            </div>







            <div class="rounded-md bg-btn-yellow px-2 py-1 hidden md:block" >
                <button class="text-white font-semibold">+257 66478279</button>
            </div>
            <div class="md:hidden icon-menu ml-3 mr-1" @click="displayNavMenu">
                <span :class="isShowMenu ? 'rotate-first' : '' " class="w-8 h-1 rounded-sm bg-white block my-1 transition-transform duration-300"></span>
                <span :class="isShowMenu ? 'hidden' : '' " class="w-8 h-1 rounded-sm bg-white block  transition-transform duration-300"></span>
                <span :class="isShowMenu ? 'rotate-second' : '' " class="w-8 h-1 rounded-sm bg-white block my-1 transition-transform duration-300"></span>
            </div>
        </div>
         
    </header>
</template>

<style> 
    .rotate-first {
        top: 5px;
        transform: rotate(-45deg);
        position: relative;
    }
    .rotate-second {
        transform: rotate(45deg);
        position: relative;
        top: -3px;
    }
    .showNavMenu{
        display: flex;
        height: 0;
        padding: 0;
    }
    @media screen and (max-width: 768px) {
        .hiddenNavMenu{ 
            display: flex;
            height: 0;
            padding: 0; 
        }
        .hiddenNavMenu.active{
            display: none;
        }
        .showNavMenu.active{ 
            height: 50px;
            padding: 4px; 
        }
    } 
    @media screen and (max-width: 640px) {
        .showNavMenu.active{ 
            height: 180px;
            padding: 4px; 
        }
    } 
    @media screen and (min-width: 768px) {
        .showNavMenu.active{ 
            height: auto;
            padding: 4px; 
        }
    } 

    @media screen and (min-width: 768px) and (max-width: 900px) {
        .hiddenMenuTablette {
            display: none;
        }
    }
    @media screen and (max-width: 350px) { 
        .accrodev-title{
            font-size: 1.2rem;
            line-height: 1.2rem;
        }
        .movie-title {
            font-size: 1rem;
            line-height: 1rem;
        }
    }
    @media screen and (max-width: 270px) {
        .headerTitle{
            display: none;
        }
        .icon-menu {
            margin-left: 0px;
        }
    }
</style>