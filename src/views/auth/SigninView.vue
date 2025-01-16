<script setup>
import { ref } from 'vue';
import HeaderComponent from '@/components/principal/HeaderComponent.vue';
import { useAuthStore } from '@/stores/AuthStore';
import axios from 'axios';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useRouter } from 'vue-router';


const fullName = ref('');
const email = ref('');
const password = ref('');
const confCode = ref('');
const Sending = ref(false);
const SendingCode = ref(false);
const Routeur = useRouter();

const globalStore = useGlobalStore();
 
const errors = ref({ fullName : false, email : false, password : false, serveurError : false, subCodeError : false });
const handleSubmit = async () => { 
  errors.value.serveurError = false;
  if (Sending.value === true) {
    return;
  } 
  // verifier le formulaire

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const checkEmail =  emailRegex.test(email.value);
  let error = false;
  if (fullName.value.length < 4 ) {
    error = true;
    errors.value.fullName = true; 
  } else {errors.value.fullName = false;  }

  if (password.value.length < 4 ) {
    error = true;
    errors.value.password = true; 
  } else {errors.value.password = false;  }

  if (!checkEmail) {
    error = true;
    errors.value.email = true; 
  } else {errors.value.email = false;  } 
  if (error) {
    return;
  }

  // envoyer les données
 
   const formData = new FormData();
        formData.append("name", fullName.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
  

  Sending.value = true;
  try { 

    const response = await axios.post(`${globalStore.apiHost}/api/register`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }); 
    
    if (response.data.statut && response.data.statut === true) {
      errors.value.serveurError = false;
      AuthStore.setDisplayBlock("confirm")
    }else { 
      errors.value.serveurError = response.data.message ? response.data.message : " Erreur Serveur "
    }  
    Sending.value = false;
  } catch (error) {
    Sending.value = false;
    errors.value.serveurError = "veillez vérifier votre connexion"
    console.error('Error fetching recommended movies:', error);
  }  
};

const submitCodeConf = async () => { 

  errors.value.subCodeError = false;
  if (SendingCode.value === true) {
    return;
  } 
  // verifier le formulaire  
  if (confCode.value < 100 ) { 
    errors.value.subCodeError = true; 
    return;
  }  
  // envoyer les données
 
   const formData = new FormData();
        formData.append("confirmation_code", confCode.value); 
  

    SendingCode.value = true;
  try { 

    const response = await axios.post(`${globalStore.apiHost}/api/confirm`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }); 
    
    if (response.data.statut && response.data.statut === true) {
      errors.value.subCodeError = false;
      AuthStore.setUserDate({
        "name" : response.data.name,
        "email" : response.data.email,
        "accreditation" : response.data.accreditation,
        "date" : response.data.date,
        "avatar" : response.data.avatar,
        "id" : response.data.id, 
      })
      AuthStore.setDisplayBlock("success")
      //next loading of this page
      setTimeout(() => {
        AuthStore.setDisplayBlock("signin")
        Routeur.push({name : 'home'});
      }, 2000);

    }else { 
      errors.value.subCodeError = response.data.message ? response.data.message : " Erreur Serveur "
    }  
    SendingCode.value = false;
  } catch (error) {
    SendingCode.value = false;
    errors.value.subCodeError = "veillez vérifier votre connexion"
    console.error('Error fetching recommended movies:', error);
  } 
}

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
                      <div class="relative" >
                        <input type="text" id="fullName" v-model="fullName" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white" placeholder="full name" >
                        <i v-if="errors.fullName" class="fas fa-triangle-exclamation inline-flex justify-center items-center top-0 bottom-0 absolute right-0 text-red-400" style="display: inline-flex;" ></i>
                      </div>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-white">Email</label>
                        <div class="relative" >
                          <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white"  placeholder="email" >
                          <i v-if="errors.email" class="fas fa-triangle-exclamation inline-flex items-center top-0 bottom-0 absolute right-0 text-red-400" style="display: inline-flex;" ></i>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                        <div class="relative" > 
                          <input type="text" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none  sm:text-sm bg-transparent text-white"  placeholder="password" >
                          <i v-if="errors.password" class="fas fa-triangle-exclamation inline-flex items-center top-0 bottom-0 absolute right-0 text-red-400" style="display: inline-flex;" ></i>
                        </div>
                    </div>
                    <div v-if="errors.serveurError" class=" m-3 text-sm text-red-200 underline lowercase" > {{ errors.serveurError }} </div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">
                      <span class="inline-flex justify-center items-center" v-if="Sending" >
                        <span class="spinner inline-block w-4 h-4 border-2 mr-1 border-white border-b-2 border-b-transparent rounded-full" ></span> Enregistrement...
                      </span> 
                      <span v-else >S'inscrire</span> 
                    </button>
                </div>








                <div  v-if="AuthStore.displayBlock === 'confirm'" >
                    <!-- confirm -->
                    <div class="mb-4">
                        <label for="email" class="block text-sm my-5 font-medium text-white">Un code de confirmation a été envoyé à votre adresse e-mail. Veuillez consulter votre boîte de réception principale ou vos spams (messages indésirables) pour trouver ce code. Ensuite, entrez-le dans le champ ci-dessous pour confirmer votre compte.</label>
                        <div class="relative">
                          <input type="number" id="confCode" v-model="confCode" required class="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent text-white"  placeholder="code de confirmation"  >
                          <i v-if="errors.subCodeError" class="fas fa-triangle-exclamation inline-flex items-center top-0 bottom-0 absolute right-0 text-red-400" style="display: inline-flex;" ></i>
                        </div>
                    </div>
                    <div v-if="errors.subCodeError && errors.subCodeError !== true" class=" m-3 text-sm text-red-200 underline lowercase" > {{ errors.subCodeError }} </div>
                    <div class="w-full flex justify-between flex-wrap" >
                        <button @click="AuthStore.setDisplayBlock('signin')" type="button" class=" w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Retour</button>
                        <button @click="submitCodeConf" type="button" class=" w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Confirmer</button>
                    </div>
                </div>


                
                
                <div  v-if="AuthStore.displayBlock === 'success'" >
                    <!-- success -->
                    <div class="mb-4">
                        <label for="email" class="block text-sm my-5 font-medium text-white">Votre compte a été Crée avec succes, Vous etes connectez au nom de {{ AuthStore.userData.name ? AuthStore.userData.name : ''  }} </label> 
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