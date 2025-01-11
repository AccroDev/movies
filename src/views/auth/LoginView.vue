<script setup>  
    import { ref } from 'vue';
    import HeaderComponent from '@/components/principal/HeaderComponent.vue';
    import { useAuthStore } from '@/stores/AuthStore';

    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);

    const handleSubmit = () => {
    // Logique de soumission du formulaire
    console.log('Email:', email.value);
    console.log('Password:', password.value); 
    };

    const AuthStore = useAuthStore();
</script>

<template>
  <HeaderComponent/> 
  <section class="w-full loginSection flex items-center justify-center bg-custom-gradient p-2 sm:p-4 relative">
    <div class="overflow-hidden p-8 rounded-lg w-full max-w-md relative z-10 animate-fade-in">
      
        <transition
            :name="AuthStore.direction === 'right' ? 'slide-right' : 'slide-left'"
            mode="out-in"
        > 
            <form :key="AuthStore.displayLoginBlock"  @submit.prevent="handleSubmit">



                <div v-if="AuthStore.displayLoginBlock === 'login'" > 
                    <h2 class="text-2xl font-bold mb-6 text-center text-white">Connexion</h2>
                    <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-white">Email</label>
                    <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white">
                    </div>
                    <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                    <input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                    </div>
                    <div class="hidden sm:flex items-center justify-between mb-6">
                    <div class="flex items-center">
                        <input id="remember_me" type="checkbox" v-model="rememberMe" class="h-4 w-4 text-indigo-600  rounded">
                        <label for="remember_me" class="ml-2 block text-sm text-white">Se souvenir de moi</label>
                    </div>
                    <div class="text-sm" @click="AuthStore.setDisplayBlock('sendmail',true)" >
                        <a href="#" class="font-medium text-white hover:text-gray-200">Mot de passe oublié?</a>
                    </div>
                    </div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Se connecter</button>
                </div>




                <div v-if="AuthStore.displayLoginBlock === 'sendmail'" >
                    <h2 class="text-2xl font-bold mb-6 text-center text-white">Récuperer son Compte</h2>
                    <div class="mb-6">
                        <span class="block text-sm font-medium text-white mt-5 mb-2"> Nous allons vous aider à recuperer votre compte</span>
                        <label for="email" class="block text-sm font-medium text-white">Entrer votre adress mail</label>
                        <input type="text" id="email" required class="mt-5 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                    </div> 
                    <div class="flex flex-wrap justify-between" >

                        <button  @click="AuthStore.setDisplayBlock('login',true)" type="submit" class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Retourner</button>

                        <button  @click="AuthStore.setDisplayBlock('changepwd',true)" type="submit" class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Se connecter</button>

                    </div>
                </div>



                <div v-if="AuthStore.displayLoginBlock === 'changepwd'" >
                    <h2 class="text-2xl font-bold mb-6 text-center text-white">Récuperer son Compte</h2>
                    <div class="mb-4">
                        <label for="codeConf" class="block text-sm font-medium text-white">Email</label>
                        <input type="text" id="codeConf" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                        <input type="text" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white">
                    </div> 
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Enregistrer</button>
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
    .loginSection {
        min-height: calc(100vh - 80px);
    }
</style>