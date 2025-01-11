<script setup>
import { ref } from 'vue';
import HeaderComponent from '@/components/principal/HeaderComponent.vue';
import { useAuthStore } from '@/stores/AuthStore';


const fullName = ref('');
const email = ref('');
const password = ref('');

const handleSubmit = () => {
  // Logique de soumission du formulaire
  console.log('Nom complet:', fullName.value);
  console.log('Email:', email.value);
  console.log('Mot de passe:', password.value);
};

const AuthStore = useAuthStore();

</script>

<template>
  <HeaderComponent/>
  <section class="w-full signinSection flex items-center justify-center bg-custom-gradient p-2 sm:p-4 relative">
    <div class="overflow-hidden p-8 rounded-lg w-full max-w-md relative z-10 animate-fade-in">
        <h2 class="text-2xl font-bold mb-6 text-center text-white">Inscription</h2>
        <transition
            :name="AuthStore.direction === 'right' ? 'slide-right' : 'slide-left'"
            mode="out-in"
        > 
            <form :key="AuthStore.displayBlock" @submit.prevent="handleSubmit">
                <div v-if="AuthStore.displayBlock === 'signin'"  > 
                    <div  class="mb-4">
                    <label for="fullName" class="block text-sm font-medium text-white">Nom complet</label>
                    <input type="text" id="fullName" v-model="fullName" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white" placeholder="full name" >
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-white">Email</label>
                        <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white"  placeholder="email" >
                    </div>
                    <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                    <input type="text" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white"  placeholder="password" >
                    </div>
                    <button @click="AuthStore.setDisplayBlock('confirm')" type="button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">S'inscrire</button>
                </div>
                <div  v-if="AuthStore.displayBlock === 'confirm'" >
                    <div class="mb-4">
                        <label for="email" class="block text-sm my-5 font-medium text-white">Nous avons envoyer un code de confirmation à votre adress mail, vueillez s'il vous plait regarder votre boite mail principal ou dans vos spam (message indésirable) pour confirmer votre compte en entran le code envoyé dans le champs ci-dessous</label>
                        <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white"  placeholder="code de confirmation"  >
                    </div>
                    <div class="w-full flex justify-between flex-wrap" >
                        <button @click="AuthStore.setDisplayBlock('signin')" type="button" class=" w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Retour</button>
                        <button @click="AuthStore.setDisplayBlock('success')" type="button" class=" w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Confirmer</button>
                    </div>
                </div>

                <div  v-if="AuthStore.displayBlock === 'success'" >
                    <div class="mb-4">
                        <label for="email" class="block text-sm my-5 font-medium text-white">Votre compte a été Crée avec succes, Vous etes connectez au nom de Lorem Upsom</label> 
                        <router-link :to="{name : 'home'}" class="text-indigo-100" > Revenir à la page d'accueil</router-link>
                    </div> 
                </div>
            </form>
        </transition>
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
    .signinSection {
        min-height: calc(100vh - 80px);
    }
 
</style>